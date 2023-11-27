'use client';

import Link from 'next/link';
import Logo from './Logo';
import SearchBar from './SearchBar';
import clsx from 'clsx';
import useSearchModal from '@/src/Hooks/useSearchModal';

const Navbar = () => {
  const { isOpen } = useSearchModal();

  return (
    <div
      className={clsx(
        'fixed bg-black w-full h-fit  shadow-sm',
        isOpen && 'hidden',
      )}
    >
      <div className="py-5">
        <div className="flex items-center justify-center gap-x-[1.8rem]">
          <div>
            <Link className="fixed top-9 left-16" href={`/`}>
              <Logo />
            </Link>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
