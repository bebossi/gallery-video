import { Channel, Playlist, Video } from '@prisma/client';
import Link from 'next/link';

export interface PlaylistInfoProps {
  playlist: Playlist & {
    videos: Video[];
    channel: Channel[];
  };
}
const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ playlist }) => {
  return (
    <div className="flex flex-col items-center rounded-xl w-1/5 bg-slate-800 bg-opacity-60 mt-20">
      <Link href={`/playlists/${playlist.id}/${playlist.videos[0].id}`}>
        <div className="group relative">
          <img
            className="h-48 w-5/6 rounded-sm my-3 group-hover:opacity-20"
            src={playlist.thumbnailUrl!}
          />
          <div className="hidden group-hover:block top-24 right-[8rem] text-2xl font-bold absolute rounded-sm text-white">
            Reproduce all
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-start items-start w-full px-12">
        <h1 className="font-bold text-2xl mb-6">{playlist.name}</h1>
        <h2 className="font-semibold text-xl">{playlist.status}</h2>
        <p>{playlist.videos.length} videos</p>
        <p>{playlist.description}</p>
      </div>
    </div>
  );
};

export default PlaylistInfo;
