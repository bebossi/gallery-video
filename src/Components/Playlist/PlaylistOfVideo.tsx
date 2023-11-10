import { Playlist, Video, Channel } from '@prisma/client';
import Link from 'next/link';
import { AiFillCaretRight } from 'react-icons/ai';

interface PlaylistOfVideoProps {
  video: Video & {
    channel: Channel;
    playlists: (Playlist & {
      videos: Video[];
      channel: Channel[];
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
      <div className="p-6 bg-slate-900">
        <h1 className="font-bold text-lg">{playlist?.name}</h1>
        <h2>{playlist?.channel[0].title}</h2>
      </div>
      <div className="h-fit">
        {playlist?.videos.map((playlistVideo: Video) => (
          <Link href={`/playlists/${playlistId}/${playlistVideo.id}`}>
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
              <p className="line-clamp-1">{playlistVideo.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistOfVideo;
