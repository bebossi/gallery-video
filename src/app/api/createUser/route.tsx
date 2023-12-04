import prismadb from '@/src/lib/prismadb';
import { User, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

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
        username: user?.username || '',
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
