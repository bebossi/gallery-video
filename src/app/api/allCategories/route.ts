import prismadb from '@/src/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prismadb.category.findMany({
      include: {
        videos: true,
      },
    });

    return NextResponse.json(categories);
  } catch (err) {
    console.log(err);
  }
}
