'use client';
import Link from 'next/link';
import Logo from './Logo';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = () => {
  return (
    <div className=" w-full z-10 shadow-sm">
      <div className="py-5 border-b-[0.5px]">
        <Sidebar />
        <div className="flex items-center justify-around gap-3 ">
          <Link className="mx-3" href={`/`}>
            <Logo />
          </Link>
          <SearchBar />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
