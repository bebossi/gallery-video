'use client';
import PlaylistCarousel from '@/src/Components/Carousel/PlaylistCarousel';
import { User, Playlist, Video, Channel } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PlaylistVideosCarousel from '@/src/Components/Carousel/PlaylistVideosCarousel';

const UserPage = () => {
  const [user, setUser] = useState<
    User & {
      playlists: (Playlist & {
        ownerChannel: Channel;
        videos: Video[];
        channels: Channel[];
        users: User[];
      })[];
    }
  >();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/getUser');
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      <div className="flex flex-col mb-[3rem] gap-y-[0.5rem]">
        <h1 className="text-4xl">Account</h1>
        <p>Manage your account</p>
        <hr className="h-1 " />
      </div>
      <div>
        <label>Username</label>
        <input className="text-black p-1" value={user?.username} />{' '}
      </div>
      <div>
        <PlaylistCarousel user={user} />
      </div>
      <div>
        <PlaylistVideosCarousel key={user?.id} user={user} />
      </div>
    </div>
  );
};

export default UserPage;
