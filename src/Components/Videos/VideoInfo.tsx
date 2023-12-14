'use client';

import { formatNumber } from '@/src/lib/formatNumber';
import { Channel, Video } from '@prisma/client';
import { useState } from 'react';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { LuUserCircle2 } from 'react-icons/lu';

interface VideoInfoProps {
  video: Video & {
    channel?: Channel;
  };
}
const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((value) => !value);
  };
  const createIframeElement = (html: any) => {
    return {
      __html: html,
    };
  };
  const modifiedHtml = video?.player
    ?.replace('width="480"', 'width="1200"')
    .replace('height="270"', 'height="600"');
  return (
    <div className="max-w-7xl p-3 rounded-md">
      <div>
        <div
          className="border border-slate-200 h-fit w-fit rounded-sm"
          dangerouslySetInnerHTML={createIframeElement(modifiedHtml)}
        />
        <h1 className="text-2xl m-2">{video?.title}</h1>
        <div className="flex  items-center justify-between">
          <div className="flex gap-x-6 items-center">
            {video?.channel?.image ? (
              <img
                className="rounded-full h-max w-max max-h-[5rem] max-w-[5rem]"
                src={video?.channel.thumbnailUrl!}
              />
            ) : (
              <LuUserCircle2 size={25} />
            )}
            <div>
              <h1 className="text-lg">{video?.channel?.title}</h1>
              <p>
                {formatNumber(Number(video?.channel?.subscriberCount))}{' '}
                subscribers
              </p>
            </div>
          </div>
          <div className="flex gap-x-3 items-center rounded-md p-2 bg-slate-900 ">
            <AiOutlineLike size={25} />
            <div className="flex divide-x gap-x-3 items-center justify-end divide-slate-400">
              <h2 className="">{formatNumber(Number(video?.likeCount))}</h2>
              <div className="px-2">
                <AiOutlineDislike size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 p-2 my-2 rounded-md ">
        <h2>{formatNumber(Number(video?.viewCount))} views</h2>
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
