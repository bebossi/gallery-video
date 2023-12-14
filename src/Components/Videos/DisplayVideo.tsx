import { formatNumber } from '@/src/lib/formatNumber';
import { Channel, Video } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

export interface DisplayVideoProps {
  video: Video & {
    channel?: Channel;
  };
  playlistId?: string;
}
const DisplayVideo: React.FC<DisplayVideoProps> = ({ video, playlistId }) => {
  return (
    <Link
      href={
        playlistId
          ? `/playlists/${playlistId}/video/${video.id}`
          : `video/${video.id}`
      }
    >
      <div
        key={video.id}
        className="flex justify-start items-start gap-x-2 rounded-md p-2 hover:bg-slate-900 w-full "
      >
        <img
          className=" h-[4rem] sm:h-[5rem] md:h-[7rem] lg:h-[7rem] xl:h-[8rem] 2xl:h-[9rem] rounded-md"
          src={video.thumbnailUrl!}
        />
        <div className="flex flex-col gap-y-2 xl:gap-y-4 text-sm md:text-base lg:text-lg xl:text-xl ">
          <p className="font-bold line-clamp-2">{video.title}</p>
          <p>
            {video.channel?.title} . {formatNumber(Number(video.viewCount))}{' '}
            views
          </p>
          <p className="line-clamp-1 w-1/2 text-sm text-slate-400">
            {video.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DisplayVideo;
