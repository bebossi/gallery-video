import React from 'react';
import { getPlaylistsFromDB } from '../../api/playlists/route';
import Link from 'next/link';
import { Playlist } from '@prisma/client';

const PlaylistPage = async () => {
  const playlists = await getPlaylistsFromDB();
  return (
    <div className="flex gap-x-12 items-center justify-center ">
      {playlists.map((playlist: Playlist) => (
        <>
          <div className="p-5 flex flex-col gap-1">
            <Link
              href={`/playlists/${playlist.id}`}
              className="text-2xl flex justify-center items-center "
            >
              {playlist.name}
            </Link>
            <iframe
              width="640"
              height="360"
              src={`http://www.youtube.com/embed/videoseries?list=${playlist.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ))}
    </div>
  );
};

export default PlaylistPage;
