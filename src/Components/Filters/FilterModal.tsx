'use client';

import useFilterModal from '@/src/Hooks/useFilterModal';
import { useLockBody } from '@/src/Hooks/useLockBody';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import qs from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FilterModal = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const filterModal = useFilterModal();
  useLockBody();
  const [uploadDate, setUploadDate] = useState('');
  const [type, setType] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filterParams = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      type: type ? type : undefined,
      uploadDate: uploadDate ? uploadDate : undefined,
      sortBy: sortBy ? sortBy : undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: updatedQuery,
      },
      { skipNull: true },
    );
    router.push(url);
  }, [type, uploadDate, sortBy]);

  return (
    <>
      {filterModal.isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[2rem] bg-slate-950 w-fit rounded-3xl">
          <div
            onClick={filterModal.toggleSidebar}
            className="absolute right-3 top-3 hover:cursor-pointer"
          >
            <AiOutlineCloseCircle size={25} />
          </div>
          <h1 className="text-3xl mb-[1rem]">Search Filters</h1>
          <div className="flex gap-x-[4rem]">
            <div>
              <h2 className="mb-[1rem] border-b pb-[0.75rem] ">UPLOAD DATE</h2>
              <ul className="flex flex-col gap-y-[1rem]">
                <li
                  onClick={() => setUploadDate('last hour')}
                  className="hover:cursor-pointer"
                  value="lastHour"
                >
                  Last hour
                </li>
                <li
                  onClick={() => setUploadDate('today')}
                  className="hover:cursor-pointer"
                  value="today"
                >
                  Today
                </li>
                <li
                  onClick={() => setUploadDate('week')}
                  className="hover:cursor-pointer"
                  value="week"
                >
                  This week
                </li>
                <li
                  onClick={() => setUploadDate('month')}
                  className="hover:cursor-pointer"
                  value="month"
                >
                  This month
                </li>
                <li
                  onClick={() => setUploadDate('year')}
                  className="hover:cursor-pointer"
                  value="year"
                >
                  This year
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-[1rem] border-b pb-[0.75rem] ">TYPE</h2>
              <ul className="flex flex-col gap-y-[1rem]">
                <li
                  onClick={() => setType('videos')}
                  className="hover:cursor-pointer"
                  value="videos"
                >
                  Videos
                </li>
                <li
                  onClick={() => setType('channels')}
                  className="hover:cursor-pointer"
                  value="channel"
                >
                  Channels
                </li>
                <li
                  onClick={() => setType('playlists')}
                  className="hover:cursor-pointer"
                  value="playlists"
                >
                  Playlists
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-[1rem] border-b pb-[0.75rem] ">SORT BY</h2>
              <ul className="flex flex-col gap-y-[1rem]">
                <li
                  onClick={() => setSortBy('relevance')}
                  className="hover:cursor-pointer"
                  value="relevance"
                >
                  Relevance
                </li>
                <li
                  onClick={() => setSortBy('date')}
                  className="hover:cursor-pointer"
                  value="date"
                >
                  Upload date
                </li>
                <li
                  onClick={() => setSortBy('views')}
                  className="hover:cursor-pointer"
                  value="views"
                >
                  View count
                </li>
                <li
                  onClick={() => setSortBy('rating')}
                  className="hover:cursor-pointer"
                  value="rating"
                >
                  Rating
                </li>
              </ul>
            </div>
          </div>
          <button onClick={filterParams} className="bg-slate-500 rounded-2xl ">
            apply filters
          </button>
        </div>
      )}
    </>
  );
};

export default FilterModal;
