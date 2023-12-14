import { Request } from 'express';
import prismadb from '@/src/lib/prismadb';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export interface ISearchFilterParams {
  type?: string;
  uploadDate?: string;
  sortByParams?: string;
  searchQuery: string;
}

interface OrderBy {
  viewCount?: 'asc' | 'desc';
  likeCount?: 'asc' | 'desc';
  publishedAt?: 'asc' | 'desc';
  relevance?: 'asc' | 'desc';
  subscriberCount?: 'asc' | 'desc';
}
interface UploadDate {
  hour?: { gte: Date; lte: Date };
  today?: { gte: Date; lte: Date };
  week?: { gte: Date; lte: Date };
  month?: { gte: Date; lte: Date };
  year?: { gte: Date; lte: Date };
}
export type UploadDateKey = 'hour' | 'today' | 'week' | 'month' | 'year';

export async function GET(req: NextApiRequest, request: Request) {
  try {
    const { searchParams } = new URL(req.url!);
    const queryParams = searchParams.get('q');
    const typeParams = searchParams.get('type');
    const uploadDateParams = searchParams.get('uploadDate');
    const sortByParams: string | null = searchParams.get('sortBy');

    let sortBy: OrderBy = {};
    let uploadDate: UploadDate = {};

    switch (typeParams) {
      case 'videos':
        if (sortByParams !== null) {
          const sortByMapping: { [key: string]: string } = {
            viewCount: 'desc',
            likeCount: 'desc',
            publishedAt: 'desc',
            relevance: 'desc',
          };

          sortBy = {
            ...sortBy,
            [sortByParams!]: sortByMapping[sortByParams!],
          };

          const uploadDateMapping: Record<
            UploadDateKey,
            { gte: Date; lte: Date }
          > = {
            hour: {
              gte: new Date(new Date().getTime() - 60 * 60 * 1000),
              lte: new Date(),
            },
            today: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lte: new Date(),
            },
            week: {
              gte: new Date(
                new Date().setDate(new Date().getDate() - new Date().getDay()),
              ),
              lte: new Date(),
            },
            month: { gte: new Date(new Date().setDate(1)), lte: new Date() },
            year: {
              gte: new Date(new Date().getFullYear(), 0, 1),
              lte: new Date(),
            },
          };

          const uploadDateKey = uploadDateParams as UploadDateKey;

          uploadDate = {
            ...uploadDate,
            [uploadDateKey]: uploadDateMapping[uploadDateKey],
          };

          const videos = await prismadb.video.findMany({
            where: {
              OR: [
                {
                  title: {
                    contains: queryParams as string,
                    mode: 'insensitive',
                  },
                },
                {
                  tags: {
                    has: queryParams as string,
                  },
                },
              ],
              publishedAt:
                uploadDateParams !== null
                  ? {
                      gte: uploadDate[uploadDateKey]?.gte,
                      lte: uploadDate[uploadDateKey]?.lte,
                    }
                  : undefined,
            },
            orderBy: sortBy,

            include: {
              channel: true,
            },
          });
          return NextResponse.json({ videos });
        }
        break;
      case 'playlists':
        const playlists = await prismadb.playlist.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: queryParams as string,
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
      case 'channels':
        if (sortByParams !== null) {
          const sortByMapping: { [key: string]: string } = {
            viewCount: 'desc',
            subscriberCount: 'desc',
            publishedAt: 'desc',
            relevance: 'desc',
          };

          sortBy = {
            ...sortBy,
            [sortByParams]: sortByMapping[sortByParams],
          };
          const channels = await prismadb.channel.findMany({
            where: {
              OR: [
                {
                  title: {
                    contains: queryParams as string,
                    mode: 'insensitive',
                  },
                },
                {
                  keyWords: {
                    contains: queryParams as string,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            include: {
              myPlaylists: true,
              videos: true,
            },
            orderBy: sortBy,
          });
          return NextResponse.json({ channels });
        }
        break;
    }

    const findManyGeneric = async (
      model: any,
      where: any,
      include?: any,
      sortBy?: any,
    ) => {
      return await model.findMany({
        where: where,
        include: include,
        sortBy: sortBy,
      });
    };

    const playlists = await findManyGeneric(
      prismadb.playlist,
      {
        OR: [
          {
            name: {
              contains: queryParams as string,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: queryParams as string,
              mode: 'insensitive',
            },
          },
        ],
      },
      {
        ownerChannel: true,
        videos: true,
      },
    );

    const channels = await findManyGeneric(prismadb.channel, {
      OR: [
        {
          title: {
            contains: queryParams as string,
            mode: 'insensitive',
          },
        },
        {
          keyWords: {
            contains: queryParams as string,
            mode: 'insensitive',
          },
        },
      ],
    });

    const videos = await findManyGeneric(
      prismadb.video,
      {
        OR: [
          {
            title: {
              contains: queryParams as string,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: queryParams as string,
            },
          },
        ],
      },
      {
        channel: true,
      },
    );

    return NextResponse.json({ playlists, videos, channels });
  } catch (err) {
    return {
      error: err,
      statusCode: 500,
    };
  }
}
