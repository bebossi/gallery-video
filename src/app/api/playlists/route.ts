import prismadb from '@/src/lib/prismadb';

export async function GET() {
  try {
    const playlists = await prismadb.playlist.findMany({
      include: {
        videos: true,
        channels: true,
        ownerChannel: true,
        users: true,
      },
    });

    return playlists;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
