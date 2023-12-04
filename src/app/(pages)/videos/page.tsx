import CategoyFilter from '@/src/Components/Filters/CategoyFilter';
import DisplayVideo from '@/src/Components/Videos/DisplayVideo';
import prismadb from '@/src/lib/prismadb';
import Link from 'next/link';

const VideosPage = async () => {
  const videos = await prismadb.video.findMany();

  return (
    <>
      <CategoyFilter />
      <div className="grid grid-cols-1 gap-5">
        {videos?.map((video) => <DisplayVideo video={video} />)}
      </div>
    </>
  );
};

export default VideosPage;
