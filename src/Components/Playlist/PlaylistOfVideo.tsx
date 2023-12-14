import { Playlist, Video, Channel } from '@prisma/client';
import Link from 'next/link';
import { AiFillCaretRight } from 'react-icons/ai';

interface PlaylistOfVideoProps {
  video: Video & {
    channel: Channel;
    playlists: (Playlist & {
      channels: Channel[];
      ownerChannel: Channel;
      videos: (Video & {
        channel: Channel;
      })[];
    })[];
  };
  playlistId?: string;
}

const PlaylistOfVideo: React.FC<PlaylistOfVideoProps> = ({
  video,
  playlistId,
}) => {
  const playlist = video.playlists.find((playlist) => {
    return playlist.id === playlistId;
  });

  return (
    <div className="border-2 border-slate-300 rounded-xl  max-w-xl">
      <div className=" flex flex-col p-6 bg-slate-900 gap-y-2">
        <Link href={`/playlists/${playlistId}`}>
          <h1 className="font-bold text-3xl">{playlist?.name}</h1>
        </Link>
        <h2 className="text-xl">{playlist?.ownerChannel.title}</h2>
      </div>
      <div className="h-fit">
        {playlist?.videos.map((playlistVideo) => (
          <Link
            key={playlist.id}
            href={`/playlists/${playlistId}/video/${playlistVideo.id}`}
          >
            <div
              key={playlistVideo.id}
              className={`${
                video.id === playlistVideo.id ? 'bg-slate-900' : ''
              }  flex items-center h-full p-2  gap-x-4`}
            >
              <p className="h-2 w-2">
                {video.id === playlistVideo.id ? (
                  <AiFillCaretRight />
                ) : (
                  playlist.videos.indexOf(playlistVideo) + 1
                )}
              </p>
              <img
                className="rounded-md h-16 "
                src={playlistVideo.thumbnailUrl!}
              />
              <div>
                <p className="line-clamp-2">{playlistVideo.title}</p>
                <p className="text-gray-400">{playlistVideo.channel.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistOfVideo;
