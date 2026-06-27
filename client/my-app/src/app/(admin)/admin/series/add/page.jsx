"use client";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { getcategory, getseries, brand as getBrand } from "@/Api-call/get_Api";
import { client, notify } from "@/app/components/utils/helper";

export default function SeriesAddPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const nameref = useRef(null);
  const slugref = useRef(null);

  // slug generator
  const createSlug = () => {
    let value = nameref.current.value;

    if (!value) {
      slugref.current.value = "";
      return;
    }

    value =
      value.charAt(0).toUpperCase() +
      value.slice(1).toLowerCase();

    nameref.current.value = value;

    slugref.current.value = value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // fetch category
  const fetchCategory = async () => {
    try {
      const res = await getcategory();
      setCategory(res.data || []);
    } catch (error) {
      console.log("category error", error);
    }
  };

  // fetch brand
  const fetchBrand = async () => {
    try {
      const res = await getBrand();
      setBrands(res.data || []);
    } catch (error) {
      console.log("brand error", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchBrand();
  }, []);

  // OPTIONS
  const categoryOptions = category.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const brandOptions = brands.map((b) => ({
    value: b._id,
    label: b.name,
  }));

  // SUBMIT
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!selectedBrand || !selectedCategory) {
      notify("Brand & Category required", false);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: nameref.current.value,
        slug: slugref.current.value,
        brandId: selectedBrand.value,
        categoryId: selectedCategory.value,
      };

      const response = await client.post("/series/create", payload);

      notify(response.data.message, response.data.success);

      if (response.data.success) {
        nameref.current.value = "";
        slugref.current.value = "";
        setSelectedBrand(null);
        setSelectedCategory(null);

        router.push("/admin/series");
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
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Add Series
      </h1>

      <form onSubmit={submitHandler} className="space-y-4">

        {/* NAME */}
        <div>
          <label className="font-medium">Series Name</label>
          <input
            type="text"
            ref={nameref}
            onChange={createSlug}
            placeholder="Example: Latitude"
            className="w-full border p-2 mt-1"
            required
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="font-medium">Slug</label>
          <input
            type="text"
            ref={slugref}
            readOnly
            className="w-full border p-2 mt-1 bg-gray-100"
          />
        </div>

        {/* BRAND */}
        <div>
          <label className="font-medium">Brand</label>
          <Select
            options={brandOptions}
            value={selectedBrand}
            onChange={setSelectedBrand}
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-medium">Category</label>
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create Series"}
        </button>

      </form>
    </div>
  );
}