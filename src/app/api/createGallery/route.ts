import prismadb from '@/src/lib/prismadb';
import { User, currentUser } from '@clerk/nextjs/server';
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
