'use client';

import useSearchModal from '@/src/Hooks/useSearchModal';
import useSidebar from '@/src/Hooks/useSideBar';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import {
  AiOutlineMenu,
  AiFillVideoCamera,
  AiOutlineUser,
} from 'react-icons/ai';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { RiPlayList2Fill, RiBarcodeBoxFill } from 'react-icons/ri';

const Sidebar = () => {
  const sideBar = useSidebar();
  const searchModal = useSearchModal();

  return (
    <>
      {!searchModal.isOpen && (
        <>
          <button
            onClick={sideBar.toggleSidebar}
            data-drawer-target="sidebar-multi-level-sidebar"
            data-drawer-toggle="sidebar-multi-level-sidebar"
            aria-controls="sidebar-multi-level-sidebar"
            type="button"
            className="fixed top-14 left-0 z-50 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <AiOutlineMenu size={25} />
          </button>
        </>
      )}
      {sideBar.isOpen ? (
        <>
          <aside
            id="sidebar-multi-level-sidebar"
            className={cn(
              'fixed top-[9.5rem] left-0 z-50 w-64 h-screen transition-transform translate-x-0 duration-200 ease-in-out',
              // sideBar.isOpen ? 'mr-[50rem]' : '',
            )}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-black ">
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    href="/videos"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <AiFillVideoCamera />
                    <span className="ms-3">Videos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    href="/playlists"
                  >
                    {/* <button
                    type="button"
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  > */}
                    <RiPlayList2Fill />
                    <span className=" ms-3">Playlists</span>
                  </Link>

                  {/* </button> */}
                  {/* <ul id="dropdown-example" className="hidden py-2 space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Billing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Invoice
                      </Link>
                    </li>
                  </ul> */}
                </li>
                <li>
                  <Link
                    href="/channels"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <AiOutlineUser />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Channels
                    </span>
                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Pro
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/galleries"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlineVideoLibrary />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Galleries
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/insertPlaylistId"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <RiBarcodeBoxFill />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Insert your playlist ID
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign In
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign Up
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
};

export default Sidebar;
