'use client';
import Link from 'next/link';
import Logo from './Logo';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <div className=" w-full z-10 shadow-sm">
      <div className="py-5 border-b-[0.5px]">
        <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
          <Link href={`/`}>
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
