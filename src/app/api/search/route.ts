import prismadb from '@/src/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url!);
    const query = searchParams.get('q');

    const playlists = await prismadb.playlist.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query as string,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query as string,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        ownerChannel: true,
        videos: true,
      },
    });

    const channels = await prismadb.channel.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query as string,
              mode: 'insensitive',
            },
          },

          {
            keyWords: {
              contains: query as string,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        viewCount: 'desc',
      },
    });
    const videos = await prismadb.video.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query as string,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: query as string,
            },
          },
        ],
      },
      orderBy: {
        viewCount: 'desc',
        // likeCount: 'desc',
      },
      include: {
        channel: true,
      },
    });
    return NextResponse.json({ playlists, videos, channels });
  } catch (err) {
    console.log(err);
  }
}
