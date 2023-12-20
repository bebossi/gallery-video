import prismadb from '@/src/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PUT = async (
  req: Request,
  { params }: { params: { playlistId: string; galleryId: string } },
) => {
  try {
    const { action } = await req.json();
    const { userId } = auth();

    const gallery = await prismadb.playlistGallery.update({
      where: {
        id: params.galleryId,
        userId: userId!,
      },
      data: {
        playlists: {
          [action]: {
            id: params.playlistId,
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
