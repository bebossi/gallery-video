import PlaylistOfVideo from '@/src/Components/Playlist/PlaylistOfVideo';
import VideoInfo from '@/src/Components/Videos/VideoInfo';
import prismadb from '@/src/lib/prismadb';

interface VideoPageProps {
  params: {
    playlistId: string;
    videoId: string;
  };
}

const VideoPage: React.FC<VideoPageProps> = async ({ params }) => {
  const video = await prismadb.video.findUnique({
    where: {
      id: params.videoId,
      playlists: {
        some: {
          id: params.playlistId,
        },
      },
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
    <div className="flex items-start ">
      <div className="py-28 flex justify-end w-full">
        <VideoInfo video={video!} />
      </div>
      <div className="flex flex-col w-1/2 h-full py-28 ">
        <PlaylistOfVideo video={video!} playlistId={params.playlistId} />
      </div>
    </div>
  );
};

export default VideoPage;
