import { useState } from 'react';
import { GET } from '../api/videos/route';
import axios from 'axios';

const VideosPage = async () => {
  const videos = await GET();
  return (
    <div className="grid grid-cols-4 gap-10">
      {videos?.map((video) => (
        <div className=" flex flex-col items-center">
          <p>{video.title}</p>
          <iframe
            className="border border-gray-200 h-fit"
            src={video.thumbnailUrl!}
          />
        </div>
      ))}
    </div>
  );
};

export default VideosPage;
