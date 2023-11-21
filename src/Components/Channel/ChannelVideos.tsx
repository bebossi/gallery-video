import { formatDate } from '@/src/lib/formatDate';
import { formatNumber } from '@/src/lib/formatNumber';
import { Channel, Video } from '@prisma/client';
import { AiFillCaretRight } from 'react-icons/ai';

interface ChannelVideoProps {
  channel: Channel & {
    videos: Video[];
  };
}
const ChannelVideos: React.FC<ChannelVideoProps> = ({ channel }) => {
  return (
    <div className="flex flex-col gap-y-[1rem]">
      <h1 className="text-2xl flex gap-x-2">
        Videos
        <span className="flex items-center text-base ">
          <AiFillCaretRight />
          play all
        </span>
      </h1>
      <div className="flex gap-x-4">
        {channel.videos.map((video) => (
          <div className="w-[13rem]">
            <img
              className="h-[8rem] w-fit rounded-2xl"
              src={video.thumbnailUrl!}
            />
            <h1 className="w-fit line-clamp-2">{video.title}</h1>
            <p>
              {formatNumber(Number(video.viewCount))} views -{' '}
              {formatDate(video.publishedAt?.toString()!)}{' '}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelVideos;
