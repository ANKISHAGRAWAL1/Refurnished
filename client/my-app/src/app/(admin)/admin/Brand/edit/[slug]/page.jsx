"use client";

import { client, notify } from "@/app/components/utils/helper";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { findbrandByslug } from "@/Api-call/get_Api";

export default function EditBrandPage() {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");

  const router = useRouter();
  const { slug } = useParams();

  const nameref = useRef();
  const slugref = useRef();
  const imageref = useRef();

  // Auto slug
  function createSlug() {
    const name = nameref.current.value;

    slugref.current.value = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  // Get brand
  async function getBrand() {
    try {
      const response = await findbrandByslug(slug);

      const data = response.data.data;
      const meta = response.data.meta;

      nameref.current.value = data.name;
      slugref.current.value = data.slug;

      setImg(`${meta.baseurl}${data.image}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBrand();
  }, []);

  // Preview image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  // Submit update
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      payload.append("name", nameref.current.value);
      payload.append("slug", slugref.current.value);

      if (imageref.current.files[0]) {
        payload.append("image", imageref.current.files[0]);
      }

      const response = await client.patch(
        `/brand/update/${slug}`,
        payload
      );

      notify(response.data.message, response.data.success);

      if (response.data.success) {
        router.push("/admin/brand");
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

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Brand</h1>

      <form onSubmit={submitHandler} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            ref={nameref}
            onChange={createSlug}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-2 font-medium">Slug</label>
          <input
            type="text"
            ref={slugref}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">Current Image</label>

          <div className="w-32 h-32 border rounded-xl overflow-hidden bg-gray-100">
            {img ? (
              <img
                src={img}
                alt="brand"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            ref={imageref}
            onChange={handleImageChange}
            className="w-full border p-3"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
        >
          {loading ? "Updating..." : "Update Brand"}
        </button>

      </form>
    </div>
  );
}