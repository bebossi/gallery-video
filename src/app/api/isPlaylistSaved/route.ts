import prismadb from '@/src/lib/prismadb';

export async function isPlaylistSaved(playlistId: string, userId: string) {
  try {
    const playlist = await prismadb.playlist.findUnique({
      where: {
        id: playlistId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (playlist) return true;
    return false;
  } catch (err) {
    console.log(err);
  }
}
