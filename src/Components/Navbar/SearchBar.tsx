'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  return (
    <form
      onSubmit={onSearch}
      className="flex justify-between items-center w-1/3   rounded-full"
    >
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className=" h-full w-full border border-slate-200 rounded-l-full p-2  bg-black"
        placeholder="What are you looking for?"
      />
      <button className="h-full text-white bg-black border border-l-0 border-slate-200 rounded-r-full p-1 pr-3">
        <LuSearch size={25} />
      </button>
    </form>
  );
};

export default SearchBar;
