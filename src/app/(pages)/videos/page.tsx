'use client';

import CategoyFilter from '@/src/Components/Filters/CategoyFilter';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import prismadb from '@/src/lib/prismadb';
import { Video } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const VideosPage = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/videos`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchData();
  }, []);

  const onChange = (categoryId: string) => {
    try {
      if (categoryId) {
        router.push(`/videos/categories/${categoryId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CategoyFilter onChange={onChange} />
      <div className="grid grid-cols-1 gap-5">
        {videos?.map((video) => <DisplayVideo key={video.id} video={video} />)}
      </div>
    </>
  );
};

export default VideosPage;
