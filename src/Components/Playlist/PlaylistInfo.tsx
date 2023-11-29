import { Channel, Playlist, Video } from '@prisma/client';
import Link from 'next/link';

export interface PlaylistInfoProps {
  playlist: Playlist & {
    ownerChannel: Channel;
    channels: Channel[];
    videos: Video[];
  };
}
const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ playlist }) => {
  return (
    <div className="flex flex-row items-center justify-start rounded-xl lg:flex-col h-full lg:h-screen w-screen sm:w-full md:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/3 bg-gradient-to-b from-slate-800 bg-opacity-80">
      <Link
        className="w-full"
        href={`/playlists/${playlist.id}/${playlist.videos[0].id}`}
      >
        <div className="group relative flex flex-col items-center justify-center w-full rounded-full ">
          <img
            className="h-40 lg:h-48 w-4/5 my-9 rounded-2xl  group-hover:opacity-20"
            src={playlist.thumbnailUrl!}
            alt={`${playlist.name} thumbnail`}
          />
          <div className="hidden group-hover:block top-24 right-[8rem] text-2xl font-bold absolute rounded-sm text-white">
            Reproduce all
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-start items-start w-full px-6 sm:px-12">
        <h1 className="font-bold text-2xl sm:text-3xl mb-2 sm:mb-4">
          {playlist.name}
        </h1>
        <h2>{playlist.ownerChannel.title}</h2>
        <h2 className="font-semibold text-xl sm:text-2xl">{playlist.status}</h2>
        <p className="text-sm sm:text-base">{playlist.videos.length} videos</p>
        <p className="text-sm sm:text-base">
          {playlist.description || 'Playlist sem descrição'}
        </p>
      </div>
    </div>
  );
};

export default PlaylistInfo;
