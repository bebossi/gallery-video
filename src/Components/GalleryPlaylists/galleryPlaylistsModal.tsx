import useGalleryPlaylistModal from '@/src/Hooks/useGalleryPlaylistModal';
import { Playlist, PlaylistGallery, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const GalleryPlaylistsModal = () => {
  const router = useRouter();
  const nameRef = useRef('');
  const { isOpen, playlistId, onClose } = useGalleryPlaylistModal();
  const [showCreateGalleryInput, setShowCreateGalleryInput] = useState(false);
  const [galleries, setGalleries] = useState<
    Array<PlaylistGallery & { playlists: Playlist[] }>
  >([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const response = await axios.get('/api/galleries');
      setGalleries(response.data);
    };

    fetchGalleries();
  }, []);

  const saveOrUnsavePlaylistGallery = async (
    isChecked: boolean,
    galleryId: string,
  ) => {
    const action = isChecked ? 'disconnect' : 'connect';

    try {
      await axios.put('/api/galleries', {
        playlistId: playlistId,
        action: action,
        galleryId: galleryId,
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const createGallery = async () => {
    try {
      await axios.post('/api/createGallery', {
        name: nameRef.current,
      });
      setShowCreateGalleryInput(false);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[2rem] bg-slate-950 w-fit rounded-3xl">
          <div className="flex justify-between gap-x-[2rem] mb-[1rem]">
            <h1 className="text-2xl">Save playlist to ...</h1>
            <button
              onClick={() => {
                onClose();
                setShowCreateGalleryInput(false);
              }}
            >
              <IoMdClose size={30} />
            </button>
          </div>
          <div className="">
            {galleries?.map(
              (gallery: PlaylistGallery & { playlists: Playlist[] }) => (
                <div
                  key={gallery.id}
                  className="flex items-center gap-x-[2rem] mb-[0.5rem] "
                >
                  <input
                    className="w-[1.5rem] h-[1.5rem]  "
                    type="checkbox"
                    checked={gallery.playlists.some(
                      (playlist) => playlist.id === playlistId,
                    )}
                    onChange={() =>
                      saveOrUnsavePlaylistGallery(
                        gallery.playlists.some(
                          (playlist) => playlist.id === playlistId,
                        ),
                        gallery.id,
                      )
                    }
                  />
                  <p className="text-xl" key={gallery.id}>
                    {gallery?.name}
                  </p>
                </div>
              ),
            )}
            <button onClick={() => setShowCreateGalleryInput((prev) => !prev)}>
              + Create new gallery
            </button>
          </div>
          {showCreateGalleryInput && (
            <>
              <input
                className="text-black"
                onChange={(e) => (nameRef.current = e.target.value)}
              />
              <button onClick={() => createGallery()}>Create</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryPlaylistsModal;
