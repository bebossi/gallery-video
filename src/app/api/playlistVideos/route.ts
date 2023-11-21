import prismadb from '@/src/lib/prismadb';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getVideosDataFromYT } from '../videos/route';
import { getChannelDataFromYt } from '../channelFromYT/route';

export async function getVideosFromPlaylist(playlistId: string) {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlistId}&key=${process.env.API_KEY_YOUTUBE}`;
  try {
    const response = await axios.get(url);
    const playlistItems = response.data.items;

    for (const playlistItem of playlistItems) {
      let video = await prismadb.video.findUnique({
        where: {
          id: playlistItem.contentDetails.videoId,
        },
        include: {
          playlists: true,
          channel: true,
        },
      });
      if (video) {
        await prismadb.video.update({
          where: {
            id: playlistItem.contentDetails.videoId,
          },
          data: {
            publishedAt: playlistItem.snippet.publishedAt,
            playlists: {
              connect: {
                id: playlistId,
              },
            },
          },
        });
      }

      if (!video) {
        await prismadb.video.create({
          data: {
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
    throw err;
  }
}
