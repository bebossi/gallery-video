'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../Components/Navbar/Navbar';
import clsx from 'clsx';
import useSidebar from '../Hooks/useSideBar';
import { usePathname } from 'next/navigation';
import Sidebar from '../Components/Sidebar/Sidebar';
import FilterModal from '../Components/Filters/FilterModal';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();
  const pathname = usePathname();
  const isVideoPage = pathname.includes('video');
  const isPlaylistPage = pathname.includes('playlists');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Sidebar />
        <FilterModal />
        <div
          className={clsx(
            'pt-[10rem] ',
            isOpen && !(isPlaylistPage && isVideoPage) && 'ml-[18rem]',
            isOpen && isPlaylistPage && isVideoPage && ' opacity-20',
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
function useLayoutClasses(): { getClasses: any } {
  throw new Error('Function not implemented.');
}
