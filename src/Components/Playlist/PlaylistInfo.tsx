import { Channel, Playlist, Video } from '@prisma/client';

export interface PlaylistInfoProps {
  playlist: Playlist & {
    videos: Video[];
    channel: Channel[];
  };
}
const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ playlist }) => {
  return (
    <div className="flex flex-col rounded-md w-fit ">
      <img className="h-56 w-56 rounded-sm" src={playlist.thumbnailUrl!} />
      <h1>{playlist.name}</h1>
      <h2>{playlist.status}</h2>
    </div>
  );
};

export default PlaylistInfo;
