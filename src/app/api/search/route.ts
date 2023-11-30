import prismadb from '@/src/lib/prismadb';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export interface ISearchFilterParams {
  type?: string;
  uploadDate?: string;
  sortBy?: string;
  searchQuery: string;
}

export async function GET(req: NextApiRequest, request: Request) {
  // export async function GET(params: ISearchFilterParams) {
  try {
    // const { type, uploadDate, sortBy, searchQuery } = params;
    // console.log('params', params);

    // let query: any = {};

    // if (searchQuery) query.searchQuery = searchQuery;

    // if (type) query.type = type;

    // if (uploadDate) query.uploadDate = uploadDate;

    // if (sortBy) query.sortBy = sortBy;
    const { searchParams } = new URL(req.url!);
    console.log(searchParams);
    const query = searchParams.get('q');
    const type = searchParams.get('type');
    const uploadDate = searchParams.get('uploadDate');
    const sortBy = searchParams.get('sortBy');

    let orderBy: any = {};

    if (type === 'videos') {
      if (sortBy === 'views') orderBy.viewCount = 'desc';
      if (sortBy === 'rating') orderBy.likeCount = 'desc';
      if (sortBy === 'date') orderBy.publishedAt = 'desc';
      if (sortBy === 'relevance') orderBy.relevance = 'desc';
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
        orderBy: orderBy,
        include: {
          channel: true,
        },
      });
      return NextResponse.json({ videos });
    }

    if (type === 'playlists') {
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
      return NextResponse.json({ playlists });
    }

    if (type === 'channels') {
      if (sortBy === 'views') orderBy.viewCount = 'desc';
      if (sortBy === 'rating') orderBy.subscriberCount = 'desc';
      if (sortBy === 'relevance') orderBy.relevance = 'desc';
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
        orderBy: orderBy,
      });
      return NextResponse.json({ channels });
    }

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
      // orderBy: {
      //   viewCount: 'desc',
      //   // likeCount: 'desc',
      // },
      include: {
        channel: true,
      },
    });
    return NextResponse.json({ playlists, videos, channels });
  } catch (err) {
    console.log(err);
  }
}
