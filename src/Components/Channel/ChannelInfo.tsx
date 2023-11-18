import { formatNumber } from '@/src/lib/formatNumber';
import { Channel } from '@prisma/client';

interface ChannelInfoProps {
  channel: Channel;
}
const ChannelInfo: React.FC<ChannelInfoProps> = ({ channel }) => {
  return (
    <div className="p-1">
      <div
        className="bg-cover bg-center h-[5rem] sm:h-[9rem] md:h-[12rem] xl:h-[15rem] rounded-3xl mb-3"
        style={{ backgroundImage: `url(${channel.image})` }}
      ></div>
      <div className="flex items-center gap-x-[1rem] ">
        <img
          src={channel.thumbnailUrl!}
          alt="image"
          className="w-[6rem] h-[6rem] sm:h-[8rem] sm:w-[8rem] md:h-[10rem] md:w-[10rem] rounded-full"
        />
        <div className="flex flex-col gap-y-[0.5rem] ">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
            {channel.title}
          </h1>
          <h2 className=" text-xs sm:text-sm md:text-lg">
            {channel.customUrl}{' '}
            <span>
              {formatNumber(Number(channel.subscriberCount))} subscribers
            </span>{' '}
            {channel.videoCount} videos{' '}
          </h2>
          <h3 className=" text-xs sm:text-sm md:text-lg  line-clamp-2">
            {channel.description}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
