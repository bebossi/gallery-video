import { formatNumber } from '@/src/lib/formatNumber';
import { Channel } from '@prisma/client';
import Link from 'next/link';

interface ChannelProps {
  channel: Channel;
}
const DisplayChannel: React.FC<ChannelProps> = ({ channel }) => {
  return (
    <Link key={channel.id} href={`/channels/${channel.id}`}>
      <div
        key={channel.id}
        className="flex w-full items-center justify-center my-[1rem]"
      >
        <div className="w-[8rem] sm:w-[9-rem] md:w-[12rem] lg:w-[15rem]">
          <img
            className="rounded-full mx-6 w-[6rem] sm:w-[6rem] md:w-[9rem] lg:w-[12rem]  "
            src={channel.thumbnailUrl!}
            alt={` image`}
          />
        </div>
        <div className="flex flex-col gap-y-3 w-[18rem] sm:w-[30rem] md:w-[40rem] lg:w-[44rem] py-5">
          <h1 className=" text-xl lg:text-2xl">{channel.title}</h1>
          <h2 className="lg:text-base text-sm">
            {channel.customUrl}{' '}
            <span>
              {formatNumber(Number(channel.subscriberCount))} subscribers
            </span>
          </h2>
          <p className="line-clamp-2">{channel.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default DisplayChannel;
