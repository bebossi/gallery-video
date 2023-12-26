'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

interface CategoryFilterProps {
  selectedCategory?: string;
  onChange?: (categoryId: string) => void;
}

const CategoyFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onChange,
}) => {
  const [categories, setCategories] = useState<any[]>();
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    onChange && onChange(selectedCategoryId);
  };
  return (
    <>
      <div className="relative inline-flex m-[1rem]">
        <select
          // defaultValue="Select a category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e)}
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
