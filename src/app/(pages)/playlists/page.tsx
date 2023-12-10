import React from 'react';
import { getPlaylistsFromDB } from '../../api/playlists/route';
import Link from 'next/link';
import { Channel, Playlist, User, Video } from '@prisma/client';
import DisplayPlaylists from '@/src/Components/Playlist/DisplayPlaylists';

const PlaylistPage = async () => {
  const playlists = await getPlaylistsFromDB();

  return (
    <div className="flex flex-col gap-x-12 items-center justify-center ">
      {playlists.map(
        (
          playlist: Playlist & {
            ownerChannel: Channel;
            videos: Video[];
            channels: Channel[];
            users: User[];
          },
        ) => (
          <>
            <DisplayPlaylists playlist={playlist!} />
          </>
        ),
      )}
    </div>
  );
};

export default PlaylistPage;
