'use client';

import VideoInfo from '@/src/Components/Videos/VideoInfo';
import React, { useEffect, useState } from 'react';
import { Video } from '@prisma/client';
import axios from 'axios';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import CategoyFilter from '@/src/Components/Filters/CategoyFilter';

interface CategoryVideosProps {
  params: {
    categoryId: string;
  };
}

const CategoryVideos: React.FC<CategoryVideosProps> = ({ params }) => {
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (params.categoryId) {
        try {
          const response = await axios.get(
            `/api/categoryVideos/${params.categoryId}`,
          );
          setVideos(response.data);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      }
    };
    fetchData();
  }, [params.categoryId]);
  return (
    <div>
      <CategoyFilter selectedCategory={params.categoryId} />
      {videos?.map((video: Video) => (
        <DisplayVideo video={video!} />
      ))}
    </div>
  );
};

export default CategoryVideos;
