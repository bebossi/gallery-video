'use client';

import useFilterModal from '@/src/Hooks/useFilterModal';
import { useLockBody } from '@/src/Hooks/useLockBody';
import { useCallback } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import qs from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterOptions from './FilterOptions';
import { filterOptions } from '@/src/lib/constants';

const FilterModal = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const {
    isOpen,
    toggleSidebar,
    uploadDate,
    type,
    sortBy,
    setUploadDate,
    setType,
    setSortBy,
  } = useFilterModal();
  useLockBody();

  const handleFilterOptionSelect = (key: string, value: string) => {
    switch (key) {
      case 'uploadDate':
        setUploadDate(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'sortBy':
        if (type !== 'playlists') {
          setSortBy(value);
        }
        break;
      default:
        break;
    }
  };

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
    toggleSidebar();
    router.push(url);
  }, [type, uploadDate, sortBy]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[2rem] bg-slate-950 w-fit rounded-3xl">
          <div
            onClick={toggleSidebar}
            className="absolute right-3 top-3 hover:cursor-pointer"
          >
            <AiOutlineCloseCircle size={25} />
          </div>
          <h1 className="text-3xl mb-[1rem]">Search Filters</h1>
          <div className="flex gap-x-[4rem]">
            {filterOptions.map((filterOption) => (
              <FilterOptions
                key={filterOption.key}
                label={filterOption.label}
                options={
                  filterOption.getOptions
                    ? filterOption.getOptions(type)
                    : filterOption.options
                }
                onSelect={(value) =>
                  handleFilterOptionSelect(filterOption.key, value)
                }
                selectedOption={
                  filterOption.key === 'uploadDate'
                    ? uploadDate
                    : filterOption.key === 'type'
                    ? type
                    : filterOption.key === 'sortBy'
                    ? sortBy
                    : ''
                }
              />
            ))}
          </div>
          <button
            onClick={filterParams}
            className=" bg-cyan-900 rounded-2xl m-[1rem] p-2 text-center"
          >
            Apply Filters
          </button>
        </div>
      )}
    </>
  );
};

export default FilterModal;
