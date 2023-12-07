import PlaylistInfo from '@/src/Components/Playlist/PlaylistInfo';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import prismadb from '@/src/lib/prismadb';
import Link from 'next/link';

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
      videos: {
        include: {
          channel: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col justify-start items-start lg:flex-row xl:flex-row mt-6 ml-6 2xl:ml-56 mr-3">
      <PlaylistInfo playlist={playlist!} />
      <div className="flex flex-col w-full ">
        {playlist?.videos.map((video) => (
          <Link key={video.id} href={`/playlists/${playlistId}/${video.id}`}>
            <DisplayVideo key={video.id} video={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
