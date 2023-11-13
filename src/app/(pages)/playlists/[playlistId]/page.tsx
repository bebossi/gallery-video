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
  const createIframeElement = (html: any) => {
    return {
      __html: html,
    };
  };
  return (
    <div className="flex justify-center gap-x-20">
      <PlaylistInfo playlist={playlist!} />
      <div className="flex flex-col gap-6 mt-20">
        {playlist?.videos.map((video) => (
          <Link href={`/playlists/${playlistId}/${video.id}`}>
            <div
              key={video.id}
              className="flex justify-start items-center gap-x-2 rounded-md p-2 hover:bg-slate-900 w-full"
            >
              <img className="h-[7rem] rounded-md" src={video.thumbnailUrl!} />
              <div className="flex flex-col">
                {video.title}
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
