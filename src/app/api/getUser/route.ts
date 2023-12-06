import { NextResponse } from 'next/server';
import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';

export const GET = async () => {
  const clerkUser = await currentUser();
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: clerkUser?.id,
      },
      include: {
        playlists: true,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
  }
};
