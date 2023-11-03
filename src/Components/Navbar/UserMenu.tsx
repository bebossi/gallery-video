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
    <div className="relative flex gap-x-12">
      <div className="flex flex-row gap-x-4 items-center justify-center">
        {/* <div className="flex flex-row items-center gap-3">Videos</div> */}
        <MenuItem label="Videos" onClick={() => {}} />
        <MenuItem label="Playlist" onClick={() => {}} />
        <MenuItem label="Channels" onClick={() => {}} />
        <MenuItem label="Videos" onClick={() => {}} />
      </div>
      <div className="m-4 hover:cursor-pointer">
        <AiOutlineMenu onClick={toggleOpen} size={25} />
      </div>
      {isOpen && (
        <div className="absolute rounded-md shadow-md right-0 top-12 bg-gray-900 w-[12rem] flex flex-col items-start px-3 gap-y-2 ">
          <MenuItem label="Videos" onClick={() => {}} />
          <MenuItem label="Playlists" onClick={() => {}} />
          <MenuItem label="Channels" onClick={() => {}} />
          <MenuItem label="Videos" onClick={() => {}} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
