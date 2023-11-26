'use client';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

const ChannelNav = () => {
  const [tab, setTab] = useState('Home');
  return (
    <>
      <ul className="flex gap-x-[4rem] justify-center text-xl ">
        <li
          className={cn(
            'hover:cursor-pointer',
            tab === 'Home' ? 'border-b-4' : '',
          )}
          onClick={() => setTab('Home')}
        >
          Home
        </li>
        <li
          className={cn(
            'hover:cursor-pointer',
            tab === 'Videos' ? 'border-b-4' : '',
          )}
          onClick={() => setTab('Videos')}
        >
          Videos
        </li>
        <li
          className={cn(
            'hover:cursor-pointer',
            tab === 'Playlists' ? 'border-b-4' : '',
          )}
          onClick={() => setTab('Playlists')}
        >
          Playlists
        </li>
      </ul>
    </>
  );
};

export default ChannelNav;
