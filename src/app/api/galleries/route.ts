import prismadb from '@/src/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const gallery = await prismadb.playlistGallery.findMany({
      include: {
        playlists: true,
        user: true,
      },
    });

    return NextResponse.json(gallery);
  } catch (err) {
    console.error(err);
    throw new Error('Something went wrong ');
  }
};

export const PUT = async (req: Request) => {
  try {
    const { galleryId, playlistId, action } = await req.json();

    const gallery = await prismadb.playlistGallery.update({
      where: {
        id: galleryId,
      },
      data: {
        playlists: {
          [action]: {
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
