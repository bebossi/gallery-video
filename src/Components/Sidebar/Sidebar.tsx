'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  AiOutlineMenu,
  AiFillVideoCamera,
  AiOutlineUser,
} from 'react-icons/ai';
import { RiPlayList2Fill, RiBarcodeBoxFill } from 'react-icons/ri';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toogleSidebar = () => {
    setShowSidebar((value) => !value);
  };

  return (
    <>
      <button
        onClick={toogleSidebar}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="absolute inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <AiOutlineMenu size={20} />
      </button>
      {showSidebar ? (
        <>
          <aside
            id="sidebar-multi-level-sidebar"
            className="relative top-[10rem] left-0 z-50 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
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
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <RiPlayList2Fill />
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      Playlists
                    </span>
                  </button>
                  <ul id="dropdown-example" className="hidden py-2 space-y-2">
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
                  </ul>
                </li>
                <li>
                  <Link
                    href="#"
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
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
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
                      Products
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
