'use client';

import { PlaylistGallery } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const GalleriesPage = () => {
  const [name, setName] = useState('');
  const [galleries, setGalleries] = useState<PlaylistGallery[]>([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const response = await axios.get('/api/galleries');
      setGalleries(response.data);
    };

    fetchGalleries();
  }, []);

  const createGallery = async () => {
    try {
      await axios.post('/api/galleries', {
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
        {galleries?.map((gallery) => (
          <p className="bg-red-300" key={gallery.id}>
            {gallery?.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default GalleriesPage;
