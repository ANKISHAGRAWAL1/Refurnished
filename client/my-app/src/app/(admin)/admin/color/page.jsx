"use client";

import { useEffect, useState } from "react";
import { color as getColors } from "@/Api-call/get_Api";
import Link from "next/link";

export default function ColorPage() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const res = await getColors();
      setColors(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Color Management
        </h1>

        <Link
          href="/admin/color/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Color
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Color</th>
             <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {colors.map((item, index) => (
             <tr key={item._id} className="border-b">
  <td className="p-4">{index + 1}</td>

  <td className="p-4 font-medium">
    {item.name}
  </td>

  <td className="p-4">
    <span
      className="px-4 py-2 rounded-lg font-semibold border"
      style={{
        backgroundColor: item.code,
        color:
          item.code.toLowerCase() === "#ffffff"
            ? "#000"
            : "#fff",
      }}
    >
      {item.code}
    </span>
  </td>

  <td className="p-4">
    <div className="flex justify-center gap-3">
      

      <button className="bg-red-600 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  </td>
</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}