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
          channels: true,
          ownerChannel: true,
          videos: {
            include: {
              channel: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex items-start gap-x-[15rem] mt-[2rem]">
      <div className=" flex justify-around w-full">
        <VideoInfo video={video!} />
      </div>
      <div className=" w-1/2 h-full  ">
        <PlaylistOfVideo video={video!} playlistId={params.playlistId} />
      </div>
    </div>
  );
};

export default VideoPage;
