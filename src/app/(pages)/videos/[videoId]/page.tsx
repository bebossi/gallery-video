import PlaylistOfVideo from '@/src/Components/Playlist/PlaylistOfVideo';
import VideoInfo from '@/src/Components/Videos/VideoInfo';
import prismadb from '@/src/lib/prismadb';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { LuUserCircle2 } from 'react-icons/lu';

interface VideoPageProps {
  params: {
    videoId: string;
    playlistId: string;
  };
}

const VideoPage: React.FC<VideoPageProps> = async ({ params }) => {
  console.log(params);
  const video = await prismadb.video.findUnique({
    where: {
      id: params.videoId,
    },
    include: {
      channel: true,
      playlists: {
        include: {
          videos: true,
          channels: true,
          ownerChannel: true,
        },
      },
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="py-28">
        <VideoInfo video={video!} />
      </div>
    </div>
  );
};

export default VideoPage;
