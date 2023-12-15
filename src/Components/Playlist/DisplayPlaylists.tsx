import { cn } from '@/src/lib/utils';
import { Channel, Playlist, User, Video } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export interface DisplayPlaylistsProps {
  playlist: Playlist & {
    ownerChannel: Channel;
    videos: Video[];
    channels: Channel[];
    users: User[];
  };
  carousel?: boolean;
}

const DisplayPlaylists: React.FC<DisplayPlaylistsProps> = ({
  playlist,
  carousel,
}) => {
  return (
    <div
      key={playlist.id}
      className={cn('p-5 flex gap-x-3 ', carousel ? 'flex-col' : 'flex-row  ')}
    >
      <div className="group relative ">
        <Image
          alt={''}
          width={120}
          height={80}
          className="group max-w-none lg:w-[16rem] xl:w-[20rem] rounded-2xl hover:cursor-pointer border-double border-t-8 outline-1 outline-double ring-1 group-hover:opacity-20"
          src={playlist.thumbnailUrl!}
        />
        <div className="hidden group-hover:block top-20 left-20 hover:cursor-pointer text-2xl font-bold absolute rounded-sm text-white ">
          Reproduce all
        </div>
      </div>
      <Link href={`/playlists/${playlist.id}`}>
        <div
          className={cn(
            'flex flex-col justify-start items-start  md:gap-y-1 lg:gap-y-2 ',
            carousel
              ? 'w-[21srem]'
              : 'lg:h-[10rem] w-[15rem] sm:w-[25rem] md:w-[30rem] lg:w-[35rem] xl:w-[40rem]',
          )}
        >
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
