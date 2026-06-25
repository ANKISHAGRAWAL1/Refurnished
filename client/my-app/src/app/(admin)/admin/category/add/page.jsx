"use client";

import { client } from "@/app/components/utils/helper";
import { useRef, useState } from "react";
import { notify } from "@/app/components/utils/helper";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const [loading, setLoading] = useState(false);
  const router =useRouter()

  const nameref = useRef();
  const slugref = useRef();
  const imageref = useRef();

  // Create slug automatically
  function createSlug() {
    const categoryName = nameref.current.value;

    const slug = categoryName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    slugref.current.value = slug;
  }

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
     setLoading(true);
const payload =new FormData();
payload.append("name", nameref.current.value);
payload.append("slug", slugref.current.value);
payload.append("image", imageref.current.files[0]);

    try {
      const response = await client.post("category/creat", payload
      );
       notify(response.data.message,response.data.success)
    if (response.data.success) {
        nameref.current.value="";
        slugref.current.value=""     }
       router.push("/admin/category")
    } catch (error) {
    notify(error.response?.data?.message || "Internal Server Error",false);
}
     
      
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>

      <form onSubmit={submitHandler} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            ref={nameref}
            onChange={createSlug}
            required
            placeholder="Enter category name"
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

        {/* Image URL */}
        <div>
          <label className="block mb-2 font-medium">Image URL</label>
          <input
            type="file"
            accept="images"
            ref={imageref}
            name="images"
            
            placeholder="Enter image URL"
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
        >
          {loading ? "Please Wait..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}