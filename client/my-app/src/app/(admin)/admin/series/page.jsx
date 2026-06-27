"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import Link from "next/link";
import Delete from "@/app/components/admin/Delete";

import { brand as getBrand } from "@/Api-call/get_Api";
import { client, notify } from "@/app/components/utils/helper";

export default function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // FETCH BRANDS
  const fetchBrand = async () => {
    try {
      const res = await getBrand();
      setBrands(res.data || []);
    } catch (error) {
      console.log("brand error", error);
    }
  };

  // FETCH SERIES (FIXED)
 const fetchSeries = async (brandId = "") => {
  try {
    let url = "/series/";

    if (brandId) {
      url += `?brandId=${brandId}`;
    } 

    const res = await client.get(url);

    setSeries(res.data.data || []);
  } catch (error) {
    console.log("series error", error);
  }
};
  useEffect(() => {
  fetchBrand();
  fetchSeries();
}, []);

  // FILTER CHANGE
  const handleBrandChange = (selected) => {
    setSelectedBrand(selected);

    if (selected) {
      fetchSeries(selected.value);
    } else {
      fetchSeries();
    }
  };

  

  // BRAND OPTIONS
  const brandOptions = brands.map((b) => ({
    value: b._id,
    label: b.name,
  }));

  return (
    <div className="p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Series
        </h1>

        <Link
          href="/admin/series/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Series
        </Link>
      </div>

      {/* FILTER */}
      <div className="mb-5 w-64">
        <Select  
          options={brandOptions}
          value={selectedBrand}
          onChange={handleBrandChange}
          isClearable
          placeholder="Filter by Brand"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Series Name</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {series.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Series Found
                </td>
              </tr>
            ) : (
              series.map((item, index) => (
                <tr key={item._id} className="text-center">

                  <td className="border p-2">
                    {index + 1}
                  </td>

                  <td className="border p-2 font-semibold">
                    {item.name}
                  </td>

                  <td className="border p-2">
                    {item.brandId?.name}
                  </td>

                  <td className="border p-2">
                    {item.categoryId?.name}
                  </td>

                  <td className="border p-2">
                    <button
                       
                      className=" text-white px-2 py-1 rounded">
                      
                      <Delete id={item._id}
                      endpoint="series"/>
                    </button>
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