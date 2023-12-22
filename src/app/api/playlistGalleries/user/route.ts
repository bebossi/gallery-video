import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { name, categoryId, description } = await req.json();
    const clerkUser = await currentUser();
    const gallery = await prismadb.playlistGallery.create({
      data: {
        name: name,
        userId: clerkUser!.id,
        categoryId: categoryId,
        description: description,
      },
    });

    return NextResponse.json(gallery);
  } catch (err) {
    console.error(err);
    throw new Error('Something went wrong ');
  }
};

export const GET = async (req: Request) => {
  const clerkUser = await currentUser();

  try {
    const gallery = await prismadb.playlistGallery.findMany({
      where: {
        userId: clerkUser?.id,
      },
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
