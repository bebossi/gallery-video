'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search/q=${encodedSearchQuery}`);
  };
  return (
    <form onSubmit={onSearch} className="flex justify-center w-2/3">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="px-5 py-1 w-2/3 "
        placeholder="What are you looking for?"
      />
    </form>
  );
};

export default SearchBar;
