import React from 'react';
import { getPlaylistsFromDB } from '../../api/playlists/route';
import Link from 'next/link';
import { Channel, Playlist, User, Video } from '@prisma/client';
import DisplayPlaylists from '@/src/Components/Playlist/DisplayPlaylists';

const PlaylistPage = async () => {
  const playlists = await getPlaylistsFromDB();

  return (
    <div className="flex flex-col gap-x-12 items-start  ">
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
            <DisplayPlaylists key={playlist.id} playlist={playlist!} />
          </>
        ),
      )}
    </div>
  );
};

export default PlaylistPage;
