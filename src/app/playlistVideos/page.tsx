'use client';
import axios from 'axios';
import { useState } from 'react';

const PlaylistVideosPage = () => {
  const [videos, setVideos] = useState<any>();
  const [playlistId, setPlaylistId] = useState('');

  const handlePlaylistId = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/playlistVideos?playlistId=${playlistId}`,
      );

      setVideos(response.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center m-3">
        <input
          onChange={(e) => setPlaylistId(e.target.value)}
          placeholder="insert yout playlist Id"
          className="text-black font-bold bg-white"
        />
        <button onClick={handlePlaylistId}>Search</button>
      </div>
      <div className="grid grid-cols-4 items-center justify-center">
        {videos &&
          videos?.items.map((item: any) => (
            <div className="flex flex-col items-center" key={item.id}>
              <h3>{item.snippet.title}</h3>
              <iframe
                className="border border-gray-400 w-full h-full"
                src={item.snippet.thumbnails.medium.url}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlaylistVideosPage;
