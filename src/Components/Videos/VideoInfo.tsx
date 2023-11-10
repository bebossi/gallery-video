'use client';

import { Channel, Video } from '@prisma/client';
import { useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { LuUserCircle2 } from 'react-icons/lu';

interface VideoInfoProps {
  video: Video & {
    channel: Channel;
  };
}
const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((value) => !value);
  };
  return (
    <div className="max-w-6xl  p-3 rounded-md">
      <div>
        <h1 className="text-2xl m-2">{video?.title}</h1>
        <div className="flex  items-center justify-between">
          <div className="flex gap-x-6 items-center">
            {video?.channel.image ? (
              <img
                className="rounded-full h-max w-max max-h-[5rem] max-w-[5rem]"
                src={video?.channel.thumbnailUrl!}
              />
            ) : (
              <LuUserCircle2 size={25} />
            )}
            <div>
              <h1 className="text-lg">{video?.channel.title}</h1>
              <p>{video?.channel.subscriberCount} subscribers</p>
            </div>
          </div>
          <div className="flex gap-x-3 items-center rounded-md p-2 bg-slate-900 ">
            <AiOutlineLike size={25} />
            <div className="flex divide-x gap-x-3 items-center justify-end divide-slate-400">
              <h2 className="">{video?.likeCount}</h2>
              <div className="px-2">
                <AiOutlineDislike size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 p-2 my-2 rounded-md ">
        <h2>{video?.viewCount} views</h2>
        <p className={`${showDetails ? '' : 'line-clamp-1'}`}>
          {video?.description}
        </p>
        <button onClick={handleShowDetails}>
          {showDetails ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;
