import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
export const PUT = async (req: NextRequest) => {
  console.log(req.body);
  const { playlistId } = await req.json();
  const clerkUser = await currentUser();

  try {
    const playlist = await prismadb.playlist.update({
      where: {
        id: playlistId as string,
      },
      data: {
        users: {
          connect: {
            id: clerkUser?.id as string,
          },
        },
      },
    });
    return NextResponse.json(playlist);
  } catch (err) {
    console.log(err);
  }
};
