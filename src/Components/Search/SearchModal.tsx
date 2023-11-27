'use client';

import useSearchModal from '@/src/Hooks/useSearchModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuSearch, LuArrowLeft } from 'react-icons/lu';

const SearchModal = () => {
  const searchModal = useSearchModal();

  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
    searchModal.onClose();
  };

  return (
    <>
      {searchModal.isOpen && (
        <div className=" flex flex-col gap-[1rem] bg-black w-screen h-screen ">
          <div onClick={searchModal.onClose}>
            <LuArrowLeft size={25} />
          </div>
          <form
            onSubmit={onSearch}
            className="flex justify-between items-center w-full  rounded-full"
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              className=" h-full w-full border border-slate-200 rounded-l-full p-2  bg-black"
              placeholder="What are you looking for?"
            />
            <button
              type="submit"
              className="h-full text-white bg-black border border-l-0 border-slate-200 rounded-r-full p-[0.4rem] pr-3"
            >
              <LuSearch size={25} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SearchModal;
