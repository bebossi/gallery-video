import prismadb from '@/src/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function searchResults(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q: query } = req.query;

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
            channel: {
              every: {
                title: query as string,
              },
            },
          },
          {
            videos: {
              every: {
                title: query as string,
              },
            },
          },
        ],
      },
    });
    return res.status(200).json(playlists);
  } catch (err) {
    console.log(err);
  }
}
