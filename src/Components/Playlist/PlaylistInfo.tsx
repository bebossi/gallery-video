'use client';
import { Channel, Playlist, User, Video } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';

export interface PlaylistInfoProps {
  playlist: Playlist & {
    ownerChannel: Channel;
    channels: Channel[];
    videos: Video[];
    users: User[];
  };
  isSaved?: boolean;
}
const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ playlist, isSaved }) => {
  const savePlaylist = async () => {
    try {
      await axios.put('/api/savePlaylist', {
        playlistId: playlist.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const unsavePlaylist = async () => {
    try {
      await axios.put('/api/unsavePlaylist', {
        playlistId: playlist.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row items-center justify-start rounded-xl ml-3 lg:flex-col h-full lg:h-screen w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3 bg-gradient-to-b from-slate-800 bg-opacity-80">
      <Link
        className="w-full"
        href={`/playlists/${playlist.id}/${playlist.videos[0].id}`}
      >
        <div className="group relative flex flex-col items-center justify-center w-full rounded-full ">
          <Image
            width={1200}
            height={800}
            className="h-fit w-fit my-9 rounded-2xl  group-hover:opacity-20"
            src={playlist.thumbnailUrl!}
            alt={`${playlist.name} thumbnail`}
          />
          <div className="hidden group-hover:block top-28 right-[8rem] text-2xl font-bold absolute rounded-sm text-white">
            Reproduce all
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-start items-start w-full lg:pl-[1rem] ">
        {isSaved ? (
          <button title="Remove playlist" onClick={unsavePlaylist}>
            <IoIosRemoveCircle size={25} />
          </button>
        ) : (
          <button title="Save playlist" onClick={savePlaylist}>
            <IoIosAddCircle size={25} />
          </button>
        )}
        <h1 className="font-bold text-2xl sm:text-3xl mb-2 sm:mb-4">
          {playlist.name}
        </h1>
        <h2>{playlist.ownerChannel.title}</h2>
        <h2 className="font-semibold text-xl sm:text-2xl">{playlist.status}</h2>
        <p className="text-sm sm:text-base">{playlist.videos.length} videos</p>
        <p className="text-sm sm:text-base">
          {playlist.description || 'Playlist without description'}
        </p>
      </div>
    </div>
  );
};

export default PlaylistInfo;
