import prismadb from '@/src/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url!);
    const query = searchParams.get('q');

    const playlists = await prismadb.playlist.findMany({
      where: {
        name: {
          contains: query as string,
        },
      },
    });
    const channels = await prismadb.channel.findMany({
      where: {
        title: {
          contains: query as string,
        },
      },
    });
    const videos = await prismadb.video.findMany({
      where: {
        title: {
          contains: query as string,
        },
      },
    });
    return NextResponse.json({ playlists, videos, channels });
  } catch (err) {
    console.log(err);
  }
}
