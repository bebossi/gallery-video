'use client';
import { formatDate } from '@/src/lib/formatDate';
import { formatNumber } from '@/src/lib/formatNumber';
import { Channel, Playlist, Video } from '@prisma/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SlidePreviousButton from '../SlidePreviousButton';
import SlideNextButton from '../SlideNextButton';

interface ChannelVideoProps {
  channel: Channel & {
    videos: Video[];
    myPlaylists: (Playlist & {
      videos: Video[];
    })[];
  };
}
const ChannelPlaylists: React.FC<ChannelVideoProps> = ({ channel }) => {
  return (
    <div className="flex flex-col ">
      {channel.myPlaylists.map((playlist) => (
        <div key={playlist.id} className="flex flex-col ">
          <h1 className="text-2xl my-[1rem]">{playlist.name}</h1>
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
              className="w-[87vw]"
            >
              <span className="absolute z-50  top-14" slot="container-start">
                <SlidePreviousButton />
              </span>
              <div className="flex">
                {playlist.videos.map((video) => (
                  <SwiperSlide className="" key={video.id}>
                    <div
                      key={video.id}
                      className="gap-3 w-[18rem] h-[18rem] hover:cursor-pointer"
                    >
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
                ))}
              </div>

              <span
                className="absolute z-50 top-14 right-0 "
                slot="container-end"
              >
                <SlideNextButton />
              </span>
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelPlaylists;
