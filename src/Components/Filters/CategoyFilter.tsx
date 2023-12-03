'use client';
import { Category } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoyFilter = () => {
  const [categories, setCategories] = useState<any[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('/api/allCategories');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    if (selectedCategoryId) {
      router.push(`/${selectedCategoryId}`);
    }
  };
  console.log(categories?.map((category) => category.videos));
  return (
    <>
      <select onChange={handleCategoryChange} className="text-black">
        {categories?.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategoyFilter;
