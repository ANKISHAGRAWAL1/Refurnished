"use client";

import { client, notify } from "@/app/components/utils/helper";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getcategory } from "@/Api-call/get_Api";
import Select from "react-select";

export default function AddBrand() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState([]);

  const router = useRouter();

  const nameref = useRef();
  const slugref = useRef();
  const imageref = useRef();

  // Create slug automatically
  function createSlug() {
    const categoryName = nameref.current.value;

    slugref.current.value = categoryName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  // Fetch categories
  const fetchcategory = async () => {
    try {
      const res = await getcategory();
      setCategory(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Category error", error);
    }
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = new FormData();

    payload.append("name", nameref.current.value);
    payload.append("slug", slugref.current.value);
    payload.append("image", imageref.current.files[0]);
   payload.append("categoryId", JSON.stringify(selectedCategory));

    try {
      const response = await client.post("brand/create", payload);

      notify(response.data.message, response.data.success);

      if (response.data.success) {
        nameref.current.value = "";
        slugref.current.value = "";
        imageref.current.value = "";
        setSelectedCategory("");

        router.push("/admin/Brand");
      }
    } catch (error) {
      notify(
        error.response?.data?.message || "Internal Server Error",
        false
      );
    } finally {
      setLoading(false);
    }
  };


// cateagory option
const categoryOptions = category.map((cat) => ({
  value: cat._id,
  label: cat.name,
}));


  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add Brand</h1>

      <form onSubmit={submitHandler} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            ref={nameref}
            onChange={createSlug}
            required
            placeholder="Enter brand name"
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-2 font-medium">Slug</label>
          <input
            type="text"
            ref={slugref}
            readOnly
            required
            className="w-full border rounded-lg p-3 bg-gray-100 outline-none"
          />
        </div>

        {/* Category */}


 
  <Select className="w-full border rounded-lg p-3 bg-gray-100 outline-none"
  isMulti
  options={categoryOptions}
  placeholder="Select Categories"
  onChange={(data) =>
    setSelectedCategory(data.map((item) => item.value))
  }
/>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            ref={imageref}
            required
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
        >
          {loading ? "Please Wait..." : "Add Brand"}
        </button>
      </form>
    </div>
  );
}