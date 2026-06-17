"use client";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoryPage() {
  const categories = [
    {
      id: 1,
      name: "Laptop",
      slug: "laptop",
      status: true,
      isHome: true,
      isPopular: false,
      isTop: true,
      isBest: false,
    },
    {
      id: 2,
      name: "Desktop",
      slug: "desktop",
      status: false,
      isHome: false,
      isPopular: true,
      isTop: false,
      isBest: true,
    },
    {
      id: 3,
      name: "Monitor",
      slug: "monitor",
      status: true,
      isHome: true,
      isPopular: true,
      isTop: false,
      isBest: true,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow">
          + Add Category
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Slug</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Home</th>
              <th className="px-6 py-4 text-center">Popular</th>
              <th className="px-6 py-4 text-center">Top</th>
              <th className="px-6 py-4 text-center">Best</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium">{item.name}</td>

                <td className="px-6 py-4 text-gray-500">{item.slug}</td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="text-center">{item.isHome ? "✅" : "❌"}</td>
                <td className="text-center">{item.isPopular ? "✅" : "❌"}</td>
                <td className="text-center">{item.isTop ? "✅" : "❌"}</td>
                <td className="text-center">{item.isBest ? "✅" : "❌"}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-200">
                      <FaEdit />
                    </button>

                    <button className="bg-red-100 p-2 rounded-lg text-red-600 hover:bg-red-200">
                      <FaTrash />
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