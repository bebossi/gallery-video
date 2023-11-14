'use client';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import MenuItem from './MenuItem';
import { useRouter } from 'next/navigation';

const UserMenu = () => {
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {
            navigate.push('/videos');
          }}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Videos
        </div>
        <div
          onClick={() => {
            navigate.push('/playlists');
          }}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Playlists
        </div>
        <div
          onClick={() => {
            navigate.push('/channels');
          }}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Channels
        </div>
        <div
          onClick={() => {
            navigate.push('/insertPlaylistId');
          }}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Insert your playlist ID
        </div>

        <div className="m-4 hover:cursor-pointer">
          <AiOutlineMenu onClick={toggleOpen} size={25} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-md shadow-md right-0 top-12 bg-gray-900 w-[12rem] flex flex-col items-start px-3 gap-y-2 ">
          <MenuItem label="Videos" onClick={() => {}} />
          <MenuItem label="Playlists" onClick={() => {}} />
          <MenuItem label="Channels" onClick={() => {}} />
          <MenuItem label="Insert your playlist ID" onClick={() => {}} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
