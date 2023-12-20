import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export const PUT = async (
  req: Request,
  { params }: { params: { playlistId: string } },
) => {
  const clerkUser = await currentUser();

  const { action } = await req.json();

  try {
    const playlist = await prismadb.playlist.update({
      where: {
        id: params.playlistId as string,
      },
      data: {
        users: {
          [action]: {
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
