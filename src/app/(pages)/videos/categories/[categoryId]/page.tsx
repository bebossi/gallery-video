'use client';

import React, { useEffect, useState } from 'react';
import { Video } from '@prisma/client';
import axios from 'axios';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import CategoyFilter from '@/src/Components/Filters/CategoyFilter';
import { useRouter } from 'next/navigation';

interface CategoryVideosProps {
  params: {
    categoryId: string;
  };
}

const CategoryVideos: React.FC<CategoryVideosProps> = ({ params }) => {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (params.categoryId) {
        try {
          const response = await axios.get(`/api/videos/${params.categoryId}`);
          setVideos(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      }
    };
    fetchData();
  }, [params.categoryId]);

  const onChange = (categoryId: string) => {
    try {
      router.push(`/videos/categories/${categoryId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CategoyFilter selectedCategory={params.categoryId} onChange={onChange} />
      {videos?.map((video: Video) => (
        <DisplayVideo key={video.id} video={video!} />
      ))}
    </div>
  );
};

export default CategoryVideos;
