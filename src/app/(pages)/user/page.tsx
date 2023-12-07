'use client';
import { User, Playlist } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const [user, setUser] = useState<User & { playlists: Playlist[] }>();

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
      <p></p>
    </div>
  );
};

export default UserPage;
