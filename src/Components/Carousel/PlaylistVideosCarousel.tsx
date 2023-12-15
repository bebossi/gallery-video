'use client';
import { formatDate } from '@/src/lib/formatDate';
import { formatNumber } from '@/src/lib/formatNumber';
import { Channel, Playlist, User, Video } from '@prisma/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SlidePreviousButton from '../SlidePreviousButton';
import SlideNextButton from '../SlideNextButton';
import { AiFillCaretRight } from 'react-icons/ai';
import Image from 'next/image';

interface PlaylistVideosCarouselProps {
  channel?: Channel & {
    videos: Video[];
    myPlaylists: (Playlist & {
      videos: Video[];
    })[];
  };
  user?: User & {
    playlists: (Playlist & {
      videos: Video[];
    })[];
  };
}
const PlaylistVideosCarousel: React.FC<PlaylistVideosCarouselProps> = ({
  channel,
  user,
}) => {
  const playlistsToRender = channel?.myPlaylists || user?.playlists || [];

  return (
    <div className="flex flex-col ">
      {playlistsToRender.map((playlist: Playlist & { videos: Video[] }) => (
        <div key={playlist.id} className="flex flex-col ">
          <h1 className="flex text-2xl my-[1rem] gap-x-2">
            {playlist.name}{' '}
            <span className="flex items-center text-base ">
              <AiFillCaretRight />
              play all
            </span>
          </h1>
          <div className="flex">
            <Swiper
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 0 },
                760: { slidesPerView: 3, spaceBetween: 0 },
                1024: { slidesPerView: 4, spaceBetween: 0 },
                1550: { slidesPerView: 5, spaceBetween: 0 },
              }}
              loop
              centeredSlides
              centeredSlidesBounds
              modules={[Navigation, Pagination, A11y]}
              className="w-[95vw] h-[12rem] lg:h-[14rem]"
            >
              <span className="absolute z-50  top-14" slot="container-start">
                <SlidePreviousButton />
              </span>
              <div className="flex">
                {playlist?.videos.map((video) => (
                  <SwiperSlide className="" key={video.id}>
                    <div
                      key={video.id}
                      className="w-[12rem] h-[12rem] md:w-[15rem] md:h-[15rem]  gap-3 hover:cursor-pointer"
                    >
                      <Image
                        className="md:w-[12rem] lg:w-[14rem] xl:w-[18rem] rounded-2xl"
                        src={video.thumbnailUrl!}
                        alt={''}
                        width={1200}
                        height={800}
                      />
                      <h1 className="w-fit line-clamp-2">{video.title}</h1>
                      <p className="absolute w-full">
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

export default PlaylistVideosCarousel;
