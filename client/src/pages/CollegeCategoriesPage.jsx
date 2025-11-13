import { useEffect, useState } from "react";
import axios from "axios";

export default function CollegeCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 College Categories</h1>
      
      {categories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div 
              key={cat._id} 
              className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {cat.icon} {cat.name}
              </h2>
              <ul className="list-disc list-inside">
                {cat.types.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
