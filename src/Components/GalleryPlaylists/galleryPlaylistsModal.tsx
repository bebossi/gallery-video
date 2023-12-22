import useGalleryPlaylistModal from '@/src/Hooks/useGalleryPlaylistModal';
import { Playlist, PlaylistGallery, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import CategoyFilter from '../Filters/CategoyFilter';

const GalleryPlaylistsModal = () => {
  const router = useRouter();
  const { isOpen, playlistId, onClose } = useGalleryPlaylistModal();
  const [showCreateGalleryInput, setShowCreateGalleryInput] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryId: '',
  });
  const [galleries, setGalleries] = useState<
    Array<PlaylistGallery & { playlists: Playlist[] }>
  >([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const response = await axios.get('/api/playlistGalleries/user');
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
      await axios.put(`/api/playlists/${playlistId}/galleries/${galleryId}`, {
        action: action,
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const createGallery = async () => {
    try {
      console.log(form);
      await axios.post('/api/playlistGalleries/user', {
        name: form.name,
        desciprtion: form.description,
        categoryId: form.categoryId,
      });
      setShowCreateGalleryInput(false);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const selectCategoryId = (categoryId: string) => {
    setForm((prevForm) => ({ ...prevForm, categoryId }));
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
                onChange={(e) =>
                  setForm((prevForm) => ({ ...prevForm, name: e.target.value }))
                }
              />
              <input
                className="text-black"
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    description: e.target.value,
                  }))
                }
              />
              <CategoyFilter onChange={selectCategoryId} />
              <button onClick={() => createGallery()}>Create</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryPlaylistsModal;
