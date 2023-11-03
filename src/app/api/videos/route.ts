import prismadb from '@/src/lib/prismadb';

export async function GET() {
  try {
    const videos = await prismadb.video.findMany();

    return videos;
  } catch (err) {
    console.log(err);
  }
}
