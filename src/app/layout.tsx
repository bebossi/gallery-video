'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../Components/Navbar/Navbar';
import clsx from 'clsx';
import useSidebar from '../Hooks/useSideBar';
import { redirect, usePathname } from 'next/navigation';
import Sidebar from '../Components/Sidebar/Sidebar';
import FilterModal from '../Components/Filters/FilterModal';
import SearchModal from '../Components/Search/SearchModal';
import { ClerkProvider, UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  useEffect(() => {
    const fecthUser = async () => {
      const response = await axios.post('/api/createUser');
      if (!response) return redirect('/sign-in');
    };
    fecthUser();
  }, []);

  const pathname = usePathname();
  const isVideoPage = pathname.includes('video');
  const isPlaylistPage = pathname.includes('playlists');

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <Sidebar />
          <FilterModal />
          <SearchModal />
          <div className="fixed top-12 right-20">
            <UserButton />
          </div>
          <div
            className={clsx(
              'pt-[10rem] mx-[1rem]',
              isOpen && !(isPlaylistPage && isVideoPage) && 'ml-[18rem]',
              isOpen && isPlaylistPage && isVideoPage && ' opacity-20',
            )}
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
