'use client';

import useFilterModal from '@/src/Hooks/useFilterModal';
import useSearchModal from '@/src/Hooks/useSearchModal';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuSearch, LuFilter } from 'react-icons/lu';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filterModal = useFilterModal();
  const searchModal = useSearchModal();
  const pathname = usePathname();
  const router = useRouter();

  const isSearchPage = pathname.includes('search');

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <>
      <form
        onSubmit={onSearch}
        className="md:flex mt-[1.5rem] w-1/3 hidden rounded-full"
      >
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className=" h-full w-full border border-slate-200 rounded-l-full p-2  bg-black"
          placeholder="What are you looking for?"
        />
        <button className="h-full text-white bg-black border border-l-0 border-slate-200 rounded-r-full p-[0.35rem] pr-3">
          <LuSearch size={25} />
        </button>
        <span
          onClick={filterModal.toggleSidebar}
          className={clsx('mx-[1rem]', !isSearchPage && 'hidden')}
        >
          <LuFilter size={25} />
        </span>
      </form>
      <div
        onClick={searchModal.onOpen}
        className={clsx(
          'md:hidden fixed top-12 right-20',
          searchModal.isOpen && 'hidden',
        )}
      >
        <LuSearch size={25} />
      </div>
    </>
  );
};

export default SearchBar;
