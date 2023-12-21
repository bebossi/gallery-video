import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const galleries = await prismadb.playlistGallery.findMany({
      include: {
        playlists: true,
        user: true,
      },
    });

    return NextResponse.json(galleries);
  } catch (err) {
    console.error(err);
    throw new Error('Something went wrong ');
  }
};
