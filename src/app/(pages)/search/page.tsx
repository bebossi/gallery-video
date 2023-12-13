'use client';

import DisplayChannel from '@/src/Components/Channel/DisplayChannel';
import DisplayPlaylists from '@/src/Components/Playlist/DisplayPlaylists';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import { Channel } from '@prisma/client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchPage: React.FC = () => {
  const search = useSearchParams();
  const searchQuery = search ? search?.get('q') : null;
  const type = search.get('type');
  const uploadDate = search.get('uploadDate');
  const sortBy: string | null = search.get('sortBy');
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const [videos, setVideos] = useState<[]>([]);
  const [playlists, setPlaylists] = useState<[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `/api/search?q=${encodedSearchQuery}&sortBy=${sortBy}&type=${type}&uploadDate=${uploadDate}`,
      );
      setVideos(data.videos);
      setPlaylists(data.playlists);
      setChannels(data.channels);
    };
    fetchData();
  }, [search]);

  return (
    <div className="flex flex-col justify-center items-start gap-y-[1rem]">
      {videos?.map((video) => <DisplayVideo video={video!} />)}
      <div>
        {channels?.map((channel) => <DisplayChannel channel={channel} />)}
      </div>
      <div>
        {playlists?.map((playlist) => (
          <DisplayPlaylists playlist={playlist!} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
