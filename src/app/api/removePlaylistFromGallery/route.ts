import prismadb from '@/src/lib/prismadb';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request) => {
  try {
    const { galleryId, playlistId } = await req.json();

    const gallery = await prismadb.playlistGallery.update({
      where: {
        id: galleryId,
      },
      data: {
        playlists: {
          disconnect: {
            id: playlistId,
          },
        },
      },
    });

    return NextResponse.json(gallery);
  } catch (err) {
    console.error(err);
    throw new Error('Something went wrong ');
  }
};
