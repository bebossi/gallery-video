import { Channel, Video } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

export interface DisplayVideoProps {
  video: Video & {
    channel: Channel;
  };
  playlistId?: string;
}
const DisplayVideo: React.FC<DisplayVideoProps> = ({ video, playlistId }) => {
  return (
    <Link
      href={
        playlistId
          ? `/playlists/${playlistId}/video/${video.id}`
          : `videos/${video.id}`
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
        <div className="flex flex-col gap-y-4 text-sm md:text-base  lg:text-lg xl:text-xl  max-w-fit w-full ">
          <p className="font-bold line-clamp-2">{video.title}</p>
          <p>
            {video.channel.title} . {video.viewCount} views
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DisplayVideo;
