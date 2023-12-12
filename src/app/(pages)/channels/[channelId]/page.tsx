import ChannelInfo from '@/src/Components/Channel/ChannelInfo';
import ChannelNav from '@/src/Components/Channel/ChannelNav';
import ChannelPlaylists from '@/src/Components/Channel/ChannelPlaylists';
import ChannelVideos from '@/src/Components/Channel/ChannelVideos';
import prismadb from '@/src/lib/prismadb';

interface ChannelPageProps {
  params: {
    channelId: string;
  };
}

const ChannelPage: React.FC<ChannelPageProps> = async ({ params }) => {
  const channel = await prismadb.channel.findUnique({
    where: {
      id: params.channelId,
    },
    include: {
      myPlaylists: {
        include: {
          videos: true,
        },
      },
      videos: true,
      playlistFromOthers: true,
    },
  });

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col justify-center items-center m-4">
        <ChannelInfo channel={channel!} />
      </div>
      <div className=" mt-[4rem] flex items-start border-b w-screen">
        <ChannelNav />
      </div>
      <ChannelVideos channel={channel!} />
      <ChannelPlaylists channel={channel!} />
    </div>
  );
};

export default ChannelPage;
