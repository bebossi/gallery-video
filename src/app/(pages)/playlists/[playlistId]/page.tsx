import PlaylistInfo from '@/src/Components/Playlist/PlaylistInfo';
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
      channel: true,
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
          <Link href={`/playlists/${playlistId}/${video.id}`}>
            <div
              key={video.id}
              className="flex justify-start items-start gap-x-2 rounded-md p-2 hover:bg-slate-900 w-full "
            >
              <img
                className=" h-[4rem] sm:h-[5rem] md:h-[7rem] lg:h-[7rem] xl:h-[8rem] 2xl:h-[9rem] rounded-md"
                src={video.thumbnailUrl!}
              />
              <div className="flex flex-col gap-y-4 text-sm md:text-base  lg:text-lg xl:text-xl  max-w-fit w-full ">
                <p className="font-bold line-clamp-2">{video.title}</p>
                <p>
                  {video.channel.title} . {video.viewCount} views
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
