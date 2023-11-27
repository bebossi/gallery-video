'use client';

import useFilterModal from '@/src/Hooks/useFilterModal';
import { useLockBody } from '@/src/Hooks/useLockBody';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const FilterModal = () => {
  const filterModal = useFilterModal();
  useLockBody();
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
                <li>Last hour</li>
                <li>Today</li>
                <li>This week</li>
                <li>This month</li>
                <li>This year</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-[1rem] border-b pb-[0.75rem] ">TYPE</h2>
              <ul className="flex flex-col gap-y-[1rem]">
                <li>Video</li>
                <li>Channel</li>
                <li>Playlist</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-[1rem] border-b pb-[0.75rem] ">SORT BY</h2>
              <ul className="flex flex-col gap-y-[1rem]">
                <li>Relevance</li>
                <li>Upload date</li>
                <li>View count</li>
                <li>Rating</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
