import { Channel, Playlist, Video } from '@prisma/client';
import Link from 'next/link';

interface DisplayPlaylistsProps {
  playlist: Playlist & {
    ownerChannel: Channel;
    videos: Video[];
  };
}
const DisplayPlaylists: React.FC<DisplayPlaylistsProps> = ({ playlist }) => {
  return (
    <div key={playlist.id} className="p-5 flex flex-row gap-x-3">
      <div>
        <img
          className=" lg:w-[16rem] xl:w-[20rem] rounded-2xl border-double border-t-8 outline-1 outline-double ring-1"
          src={playlist.thumbnailUrl!}
        />
      </div>
      <Link href={`/playlists/${playlist.id}`}>
        <div className="flex flex-col justify-start items-start  md:gap-y-1 lg:gap-y-2 lg:h-[10rem] w-[15rem] sm:w-[25rem] md:w-[30rem] lg:w-[35rem] xl:w-[40rem]">
          <p className="text-2xl sm:text-xl">{playlist.name}</p>
          <p>{playlist.ownerChannel.title}</p>
          <div className="flex flex-col">
            <p className="line-clamp-1 "> {playlist.videos[0].title} </p>
            <p className="line-clamp-1 "> {playlist.videos[1].title}</p>
          </div>
          <p className="font-bold ">VIEW FULL PLAYLIST</p>
        </div>
      </Link>
    </div>
  );
};

export default DisplayPlaylists;
