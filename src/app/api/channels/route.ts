import prismadb from '@/src/lib/prismadb';
import { NextApiRequest } from 'next';

export async function GET() {
  try {
    const channels = await prismadb.channel.findMany({
      include: {
        videos: true,
        playlists: true,
      },
    });

    return channels;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
