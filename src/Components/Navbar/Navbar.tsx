'use client';
import Link from 'next/link';
import Logo from './Logo';
// import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <div className="fixed bg-black w-full  shadow-sm">
      <div className="py-5 border-b-[0.5px]">
        <div className="flex items-center justify-evenly  ">
          <div>
            <Link href={`/`}>
              <Logo />
            </Link>
          </div>
          <SearchBar />
          {/* <UserMenu /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
