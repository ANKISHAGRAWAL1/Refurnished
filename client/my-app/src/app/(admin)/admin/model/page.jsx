 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Select from "react-select";

import {
  getcategory,
  brand as getBrand,
  getseries,
  getmodel,
} from "@/Api-call/get_Api";

import Delete from "@/app/components/admin/Delete";

export default function ModelPage() {
  const [models, setModels] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [series, setSeries] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cat = await getcategory();
      setCategories(cat.data || []);

      const brand = await getBrand();
      setBrands(brand.data || []);

      const ser = await getseries();
      setSeries(ser.data || []);

      const model = await getmodel();
      setModels(model.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  // FILTERED BRAND
  // =======================

  const filteredBrands = brands.filter((item) => {
    if (!selectedCategory) return true;

    return (
      item.categoryId?._id === selectedCategory.value ||
      item.categoryId === selectedCategory.value
    );
  });

  // =======================
  // FILTERED SERIES
  // =======================

  const filteredSeries = series.filter((item) => {
    if (!selectedBrand) return true;

    return (
      item.brandId?._id === selectedBrand.value ||
      item.brandId === selectedBrand.value
    );
  });

  // =======================
  // FILTERED MODEL
  // =======================

  const filteredModels = models.filter((item) => {
    const categoryMatch =
      !selectedCategory ||
      item.categoryId?._id === selectedCategory.value ||
      item.categoryId === selectedCategory.value;

    const brandMatch =
      !selectedBrand ||
      item.brandId?._id === selectedBrand.value ||
      item.brandId === selectedBrand.value;

    const seriesMatch =
      !selectedSeries ||
      item.seriesId?._id === selectedSeries.value ||
      item.seriesId === selectedSeries.value;

    const searchMatch =
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return (
      categoryMatch &&
      brandMatch &&
      seriesMatch &&
      searchMatch
    );
  });

  // =======================
  // OPTIONS
  // =======================

  const categoryOptions = categories.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const brandOptions = filteredBrands.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const seriesOptions = filteredSeries.map((item) => ({
    value: item._id,
    label: item.name,
  }));


    return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-3xl font-bold">
          Models
        </h1>

        <Link
          href="/admin/model/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-center"
        >
          + Add Model
        </Link>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <Select
          options={categoryOptions}
          placeholder="Select Category"
          value={selectedCategory}
          isClearable
          onChange={(value) => {
            setSelectedCategory(value);
            setSelectedBrand(null);
            setSelectedSeries(null);
          }}
        />

        <Select
          options={brandOptions}
          placeholder="Select Brand"
          value={selectedBrand}
          isClearable
          onChange={(value) => {
            setSelectedBrand(value);
            setSelectedSeries(null);
          }}
        />

        <Select
          options={seriesOptions}
          placeholder="Select Series"
          value={selectedSeries}
          isClearable
          onChange={setSelectedSeries}
        />

        <input
          type="text"
          placeholder="Search Model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[70vh] border rounded-lg">

        <table className="w-full border-collapse">

          <thead className="bg-gray-100 sticky top-0 z-10">

            <tr>

              <th className="border p-3">#</th>
              <th className="border p-3">Model Name</th>
              <th className="border p-3">Model No.</th>
              <th className="border p-3">Generation</th>
              <th className="border p-3">Brand</th>
              <th className="border p-3">Series</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredModels.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-10"
                >
                  No Model Found
                </td>

              </tr>

            ) : (

              filteredModels.map((item, index) => (

                <tr
                  key={item._id}
                  className="text-center border-t hover:bg-gray-50"
                >

                  <td className="p-3">
                    {index + 1}
                  </td>

                  <td className="p-3 font-medium">
                    {item.name}
                  </td>

                  <td className="p-3">
                    {item.modelNumber}
                  </td>

                  <td className="p-3">
                    {item.generation}
                  </td>

                  <td className="p-3">
                    {item.brandId?.name}
                  </td>

                  <td className="p-3">
                    {item.seriesId?.name}
                  </td>

                  <td className="p-3">
                    {item.categoryId?.name}
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/admin/model/edit/${item.slug}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>

                      <Delete
                        id={item._id}
                        endpoint="model"
                      />

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}