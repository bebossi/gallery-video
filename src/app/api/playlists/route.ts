import prismadb from '@/src/lib/prismadb';
import { NextApiRequest } from 'next';

export async function getPlaylistsFromDB() {
  try {
    const playlists = await prismadb.playlist.findMany({
      include: {
        videos: true,
        channels: true,
        ownerChannel: true,
        users: true,
      },
    });

    return playlists;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
