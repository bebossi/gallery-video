import PlaylistInfo from '@/src/Components/Playlist/PlaylistInfo';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import { isPlaylistSaved } from '@/src/app/api/isPlaylistSaved/route';
import prismadb from '@/src/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { Video } from '@prisma/client';

interface PlaylistPageProps {
  params: {
    playlistId: string;
  };
}
const PlaylistPage: React.FC<PlaylistPageProps> = async ({ params }) => {
  const playlistId = params.playlistId;
  const playlist = await prismadb.playlist.findUnique({
    where: {
      id: playlistId,
    },
    include: {
      channels: true,
      ownerChannel: true,
      users: true,
      videos: {
        include: {
          channel: true,
        },
      },
    },
  });
  const user = await currentUser();

  const isSaved = await isPlaylistSaved(playlistId, user!.id);

  return (
    <div className="flex flex-col justify-start items-start lg:flex-row mt-6 w-[90vw]">
      <PlaylistInfo playlist={playlist!} isSaved={isSaved} />
      <div className="flex flex-col w-full ">
        {playlist?.videos.map((video) => {
          return (
            <DisplayVideo
              key={video.id}
              video={video}
              playlistId={playlistId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistPage;
