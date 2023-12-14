'use client';
import ChannelPlaylists from '@/src/Components/Channel/ChannelPlaylists';
import DisplayPlaylists from '@/src/Components/Playlist/DisplayPlaylists';
import { User, Playlist, Video, Channel } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const [user, setUser] = useState<
    User & {
      playlists: (Playlist & {
        videos: Video[];
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
        <ChannelPlaylists key={user?.id} user={user} />
      </div>
    </div>
  );
};

export default UserPage;
