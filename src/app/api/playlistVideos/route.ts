import prismadb from '@/src/lib/prismadb';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url!);

  const playlistId = searchParams.get('playlistId') as string;
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlistId}&key=${process.env.API_KEY_YOUTUBE}`;
  try {
    const response = await axios.get(url);
    const playlistItems = response.data.items;
    console.log(response.data);

    const playlist = await prismadb.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });
    if (!playlist) {
      await prismadb.playlist.create({
        data: {
          id: playlistId,
        },
      });
    }

    for (const playlistItem of playlistItems) {
      const channelId = playlistItem.snippet.videoOwnerChannelId;
      const channelExists = await prismadb.channel.findUnique({
        where: {
          id: channelId,
        },
      });

      if (!channelExists) {
        await prismadb.channel.create({
          data: {
            id: channelId,
            title: playlistItem.snippet.videoOwnerChannelTitle,
            playlists: {
              connect: {
                id: playlistId,
              },
            },
          },
        });
      }

      let video = await prismadb.video.findUnique({
        where: {
          id: playlistItem.contentDetails.videoId,
        },
      });
      // console.log(video);
      if (!video) {
        await prismadb.video.create({
          data: {
            id: playlistItem.contentDetails.videoId,
            url: playlistItem.snippet.resourceId.videoId,
            title: playlistItem.snippet.title,
            description: playlistItem.snippet.description,
            thumbnailUrl: playlistItem.snippet.thumbnails.default.url,
            thumbnailWidth: playlistItem.snippet.thumbnails.default.width,
            thumbnailHeight: playlistItem.snippet.thumbnails.default.height,
            channelId,
            playlists: {
              connect: {
                id: playlistId,
              },
            },
          },
        });
      }
    }
    // console.log(response.data);

    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
    // throw err;
  }
}
