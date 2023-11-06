import prismadb from '@/src/lib/prismadb';
import { NextApiRequest } from 'next';

export async function GET() {
  try {
    const playlists = await prismadb.playlist.findMany({
      include: {
        videos: true,
      },
    });

    return playlists;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
