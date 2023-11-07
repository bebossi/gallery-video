import prismadb from '@/src/lib/prismadb';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getVideosFromPlaylist } from '../playlistVideos/route';

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url!);
  console.log('search params:', searchParams);
  const playlistId = searchParams.get('id') as string;
  const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2C%20status%2C%20player%2C%20localizations%2C%20id&id=${playlistId}&key=${process.env.API_KEY_YOUTUBE}`;

  try {
    const response = await axios.get(url);
    const playlist = await prismadb.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });
    const playlistInfo = response.data.items[0];
    if (!playlist) {
      await prismadb.playlist.create({
        data: {
          id: playlistId,
          name: playlistInfo.snippet.title,
          description: playlistInfo.snippet.description,
          htmlPlayer: playlistInfo.player.embedHtml,
          status: playlistInfo.status.privacyStatus,
          thumbnailUrl: playlistInfo.snippet.thumbnails.default.url,
          thumbnailWidth: playlistInfo.snippet.thumbnails.default.width,
          thumbnailHeight: playlistInfo.snippet.thumbnails.default.height,
          channel: {
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
    await getVideosFromPlaylist(playlistId);

    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
  }
}
