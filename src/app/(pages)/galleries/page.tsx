'use client';

import { Playlist, PlaylistGallery, User } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const GalleriesPage = () => {
  const [name, setName] = useState('');
  const [galleries, setGalleries] =
    useState<Array<PlaylistGallery & { playlists: Playlist[]; user: User }>>();

  useEffect(() => {
    const fetchGalleries = async () => {
      const response = await axios.get('/api/playlistGalleries');
      setGalleries(response.data);
    };

    fetchGalleries();
  }, []);

  const createGallery = async () => {
    try {
      await axios.post('/api/playlistGalleries', {
        name: name,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div>
      <label>Name</label>
      <input className="text-black" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => createGallery()}>Create Gallery</button>
      <div>
        {galleries?.map(
          (
            gallery: PlaylistGallery & { playlists: Playlist[]; user: User },
          ) => (
            <>
              {gallery.playlists.length > 0 && (
                <div className="flex items-start my-4">
                  <Image
                    alt={''}
                    width={120}
                    height={80}
                    className="group max-w-none  lg:w-[16rem] xl:w-[20rem] rounded-2xl hover:cursor-pointer border-double border-t-[10px] border-r-[10px] outline-double ring-2 group-hover:opacity-20"
                    src={gallery.playlists[0].thumbnailUrl!}
                  />
                  <div>
                    <p className="text-3xl  mb-4">Gallery {gallery.name}</p>
                    <p className="mb-2">@{gallery.user.username}</p>
                    <p className="text-gray-400">
                      {gallery.description
                        ? gallery.description
                        : 'Without description'}
                    </p>
                  </div>
                </div>
              )}
            </>
          ),
        )}
      </div>
    </div>
  );
};

export default GalleriesPage;
