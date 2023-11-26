'use client';

import DisplayChannel from '@/src/Components/Channel/DisplayChannel';
import DisplayPlaylists from '@/src/Components/Playlist/DisplayPlaylists';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import VideoInfo from '@/src/Components/Videos/VideoInfo';
import { Channel, Playlist, Video } from '@prisma/client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
interface VideoWithChannel {
  video: Video & {
    channel: Channel;
  };
}

const SearchPage: React.FC<VideoWithChannel> = ({ video }) => {
  const search = useSearchParams();
  const searchQuery = search ? search?.get('q') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const [videos, setVideos] = useState<[]>([]);
  const [playlists, setPlaylists] = useState<[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/search?q=${encodedSearchQuery}`);
      setVideos(data.videos);
      setPlaylists(data.playlists);
      setChannels(data.channels);
    };
    fetchData();
  }, [encodedSearchQuery]);

  return (
    <div className="flex flex-col justify-center items-start ml-[18rem] gap-y-[1rem]">
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
