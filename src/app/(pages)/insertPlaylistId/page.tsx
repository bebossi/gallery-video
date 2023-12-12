'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PlaylistVideosPage = () => {
  const navigate = useRouter();
  const [videos, setVideos] = useState<any>();
  const [playlistId, setPlaylistId] = useState('');

  const handlePlaylistId = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/insertPlaylistId?id=${playlistId}`,
      );

      setVideos(response.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  if (!videos) <div>No videos availiable</div>;

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
      <div className="grid grid-cols-3 items-center justify-center h-full w-full">
        {videos &&
          videos?.items.map((video: any) => (
            <div
              onClick={() => navigate.push(`/video/${video.id}`)}
              className="flex flex-col items-center h-full w-full"
              key={video.id}
            >
              <h3>{video.snippet.title}</h3>
              <img
                className="border border-gray-400 w-full h-full"
                src={video.snippet.thumbnails.medium.url}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlaylistVideosPage;
