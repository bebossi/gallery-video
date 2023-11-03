'use client';
import Logo from './Logo';
import UserMenu from './UserMenu';

const Navbar = () => {
  return (
    <div className=" w-full z-10 shadow-sm">
      <div className="py-5 border-b-[0.5px]">
        <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
          <Logo />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
