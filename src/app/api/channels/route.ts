import prismadb from '@/src/lib/prismadb';

export async function getChannelsFromDB() {
  try {
    const channels = await prismadb.channel.findMany({
      include: {
        videos: true,
        myPlaylists: true,
        playlistFromOthers: true,
      },
    });

    return channels;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
