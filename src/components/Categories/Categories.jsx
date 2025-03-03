import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); 
  const subCategoriesRef = useRef(null);

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error(err));
  }

  function getAllSubOnCate(id, name) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      .then((res) => {
        setSubCategories(res.data.data);
        setSelectedCategoryName(name); // حفظ اسم الكاتيجوري
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (subCategories.length > 0) {
      subCategoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [subCategories]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center text-emerald-700 my-4">All Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {categories.map((category) => (
          <div key={category._id} onClick={() => getAllSubOnCate(category._id, category.name)}
            className="cursor-pointer hover:shadow-emerald-500 hover:shadow-lg transition-all transform hover:scale-105 rounded-lg overflow-hidden">
            <img src={category.image} className="h-[250px] object-cover w-full" alt={category.name} />
            <h3 className="p-5 font-extrabold text-emerald-800">{category.name}</h3>
          </div>
        ))}
      </div>

      {subCategories.length > 0 && (
        <div ref={subCategoriesRef} className="mt-10 p-5 border-t">
          <h3 className="text-xl font-bold text-emerald-700">
            {selectedCategoryName} SubCategories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {subCategories.map((sub) => (
              <div key={sub._id} className="p-3 font-semibold border rounded-lg shadow-sm hover:shadow-emerald-500 hover:shadow-md transition-all transform hover:scale-95">
                {sub.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
