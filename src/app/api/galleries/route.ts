import prismadb from '@/src/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();
    const clerkUser = await currentUser();

    const gallery = await prismadb.playlistGallery.create({
      data: {
        name: name,
        userId: clerkUser!.id,
      },
    });

    return NextResponse.json(gallery);
  } catch (err) {
    console.error(err);
    throw new Error('Something went wrong ');
  }
};

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
