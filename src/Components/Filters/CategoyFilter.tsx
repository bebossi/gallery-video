'use client';
import { Category } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface CategoryFilterProps {
  selectedCategory?: string;
}

const CategoyFilter: React.FC<CategoryFilterProps> = ({ selectedCategory }) => {
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
  return (
    <>
      <div className="relative inline-flex m-[1rem]">
        <select
          defaultValue="Select a category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className=" bg-white border border-gray-300 rounded-md p-2 pr-8 text-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
        >
          <option value="videos">Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CategoyFilter;
