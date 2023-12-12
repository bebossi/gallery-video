import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
  const { playlistId } = await req.json();
  const clerkUser = await currentUser();
  try {
    const playlist = await prismadb.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        users: {
          disconnect: {
            id: clerkUser?.id,
          },
        },
      },
    });
    return NextResponse.json(playlist);
  } catch (err) {
    console.log(err);
  }
};
