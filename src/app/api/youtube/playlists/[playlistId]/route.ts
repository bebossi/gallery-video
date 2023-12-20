import prismadb from '@/src/lib/prismadb';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getVideosDataFromYT } from '../../videos/route';
import { getChannelDataFromYt } from '../../channels/route';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { playlistId: string } },
) {
  const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2C%20status%2C%20player%2C%20localizations%2C%20id&id=${params.playlistId}&key=${process.env.API_KEY_YOUTUBE}`;

  try {
    const response = await axios.get(url);
    const playlist = await prismadb.playlist.findUnique({
      where: {
        id: params.playlistId,
      },
    });
    const playlistInfo = response.data.items[0];

    if (!playlist) {
      await prismadb.playlist.create({
        data: {
          id: params.playlistId,
          name: playlistInfo.snippet.title,
          description: playlistInfo.snippet.description,
          htmlPlayer: playlistInfo.player.embedHtml,
          status: playlistInfo.status.privacyStatus,
          thumbnailUrl: playlistInfo.snippet.thumbnails.medium.url,
          thumbnailWidth: playlistInfo.snippet.thumbnails.medium.width,
          thumbnailHeight: playlistInfo.snippet.thumbnails.medium.height,
          ownerChannel: {
            connectOrCreate: {
              where: {
                id: playlistInfo.snippet.channelId,
              },
              create: {
                id: playlistInfo.snippet.channelId,
                title: playlistInfo.snippet.channelTitle,
              },
            },
          },
        },
      });
    }

    await getVideosFromPlaylist(params.playlistId);

    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
  }
}

export async function getVideosFromPlaylist(playlistId: string) {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlistId}&key=${process.env.API_KEY_YOUTUBE}`;
  try {
    const response = await axios.get(url);
    const playlistItems = response.data.items;

    for (const playlistItem of playlistItems) {
      await prismadb.video.upsert({
        where: {
          id: playlistItem.contentDetails.videoId,
        },
        update: {
          publishedAt: playlistItem.snippet.publishedAt,
          playlists: {
            connect: {
              id: playlistId,
            },
          },
        },
        create: {
          id: playlistItem.contentDetails.videoId,
          url: playlistItem.snippet.resourceId.videoId,
          title: playlistItem.snippet.title,
          description: playlistItem.snippet.description,
          thumbnailUrl: playlistItem.snippet.thumbnails.medium.url,
          thumbnailWidth: playlistItem.snippet.thumbnails.medium.width,
          thumbnailHeight: playlistItem.snippet.thumbnails.medium.height,
          publishedAt: playlistItem.snippet.publishedAt,
          playlists: {
            connect: {
              id: playlistId,
            },
          },
          channel: {
            connectOrCreate: {
              where: {
                id: playlistItem.snippet.videoOwnerChannelId,
              },
              create: {
                id: playlistItem.snippet.videoOwnerChannelId,
                title: playlistItem.snippet.videoOwnerChannelTitle,
              },
            },
          },
        },
      });
    }
    const channelsIds = playlistItems.map((playlistItem: any) => {
      return playlistItem.snippet.videoOwnerChannelId;
    });
    const videosId = playlistItems.map((playlistItem: any) => {
      return playlistItem.contentDetails.videoId;
    });
    await Promise.all([
      getVideosDataFromYT(videosId),
      getChannelDataFromYt(channelsIds),
    ]);

    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500, error: 'Server error' });
  }
}
