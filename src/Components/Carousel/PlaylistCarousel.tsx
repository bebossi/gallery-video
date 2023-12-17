'use client';

import { Channel, Video, Playlist, User } from '@prisma/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import DisplayPlaylists from '../Playlist/DisplayPlaylists';
import SlidePreviousButton from '../SlidePreviousButton';
import SlideNextButton from '../SlideNextButton';

interface PlaylistCarouselProps {
  channel?: Channel & {
    videos: Video[];
    myPlaylists: (Playlist & {
      ownerChannel: Channel;
      videos: Video[];
      channels: Channel[];
      users: User[];
    })[];
  };
  user?: User & {
    playlists: (Playlist & {
      ownerChannel: Channel;
      videos: Video[];
      channels: Channel[];
      users: User[];
    })[];
  };
}

const PlaylistCarousel: React.FC<PlaylistCarouselProps> = ({
  channel,
  user,
}) => {
  const playlistsToRender = channel?.myPlaylists || user?.playlists || [];

  return (
    <div>
      <h1>Playlists</h1>
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
          className="w-[95vw] h-[22rem] lg:h-[25rem]"
        >
          <span className="absolute z-50  top-24" slot="container-start">
            <SlidePreviousButton />
          </span>
          {playlistsToRender.map((playlist) => (
            <SwiperSlide key={playlist.id}>
              <DisplayPlaylists playlist={playlist} carousel />
            </SwiperSlide>
          ))}
          <span className="absolute z-50 top-24 right-0 " slot="container-end">
            <SlideNextButton />
          </span>
        </Swiper>
      </div>
    </div>
  );
};

export default PlaylistCarousel;
