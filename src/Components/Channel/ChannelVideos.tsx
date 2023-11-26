'use client';
import { formatDate } from '@/src/lib/formatDate';
import { formatNumber } from '@/src/lib/formatNumber';
import { Channel, Video } from '@prisma/client';
import Link from 'next/link';
import { AiFillCaretRight } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SlideNextButton from '../SlideNextButton';
import SlidePreviousButton from '../SlidePreviousButton';

interface ChannelVideoProps {
  channel: Channel & {
    videos: Video[];
  };
}
const ChannelVideos: React.FC<ChannelVideoProps> = ({ channel }) => {
  return (
    <div className="flex flex-col gap-y-[1rem] ">
      <h1 className="text-2xl flex gap-x-2 mt-[1rem]">
        Videos
        <span className="flex items-center text-base ">
          <AiFillCaretRight />
          play all
        </span>
      </h1>{' '}
      <div className="flex">
        <Swiper
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 0 },
            760: { slidesPerView: 3, spaceBetween: 0 },
            1024: { slidesPerView: 5, spaceBetween: 0 },
            1280: { slidesPerView: 6, spaceBetween: 0 },
          }}
          loop
          centeredSlides
          centeredSlidesBounds
          modules={[Navigation, Pagination, A11y]}
          className="w-[87vw] "
        >
          <span className="absolute z-50  top-14" slot="container-start">
            <SlidePreviousButton />
          </span>
          <div className="flex">
            {channel.videos.map((video) => (
              <Link key={video.id} href={`/videos/${video.id}`}>
                <SwiperSlide key={video.id}>
                  <div className="w-[18rem] h-[18rem] gap-3 hover:cursor-pointer">
                    <img
                      className="md:w-[10rem] lg:w-[15rem] xl:w-[18rem] rounded-2xl"
                      src={video.thumbnailUrl!}
                    />
                    <h1 className="w-fit line-clamp-2">{video.title}</h1>
                    <p>
                      {formatNumber(Number(video.viewCount))} views -{' '}
                      {formatDate(video.publishedAt?.toString()!)}{' '}
                    </p>
                  </div>
                </SwiperSlide>
              </Link>
            ))}
          </div>
          <span className="absolute z-50 top-14 right-0 " slot="container-end">
            <SlideNextButton />
          </span>
        </Swiper>
      </div>
    </div>
  );
};

export default ChannelVideos;
