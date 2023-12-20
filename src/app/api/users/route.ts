import { NextResponse } from 'next/server';
import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async () => {
  const user = await currentUser();
  try {
    const existsUser = await prismadb.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (existsUser)
      return NextResponse.json({ message: 'User already exists' });

    const newUser = await prismadb.user.create({
      data: {
        id: user?.id,
        email: user?.emailAddresses[0].emailAddress as string,
        username: user?.username || user?.firstName!,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(newUser);
  } catch (err) {
    console.error(err);
    throw new Error('Something went wrong ');
  }
};

export const GET = async () => {
  const clerkUser = await currentUser();
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: clerkUser?.id,
      },
      include: {
        playlists: {
          include: {
            channels: true,
            ownerChannel: true,
            videos: true,
          },
        },
        galleries: true,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
  }
};
