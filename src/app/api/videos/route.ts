import prismadb from '@/src/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const videos = await prismadb.video.findMany({
      include: {
        channel: true,
      },
    });
    return NextResponse.json(videos);
  } catch (err) {
    console.log(err);
  }
}
