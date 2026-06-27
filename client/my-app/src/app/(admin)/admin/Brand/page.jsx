import { FaEdit } from "react-icons/fa";
import { brand } from "@/Api-call/get_Api";
import Link from "next/link";
import Status from "@/app/components/admin/status";
import Delete from "@/app/components/admin/Delete";

export default async function Brandpage() {
  let brands = [];
  let meta = {};

  try {
    const res = await brand();
    brands = res.data || [];
    meta = res.meta || {};
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-6">
      {/* Header */}{" "}
      <div className="flex items-center justify-between mb-6">
        {" "}
        <h1 className="text-2xl font-bold">Brands</h1>
        <Link href="/admin/Brand/add">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow">
            + Add Brand
          </button>
        </Link>
      </div>
      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-4 text-left">id</th>
                <th className="px-4 py-4 text-left">Image</th>
                <th className="px-4 py-4 text-left">Brand</th>
                <th className="px-4 py-4 text-left">Slug</th>
                <th className="px-4 py-4 text-left">Categories</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-500">
                    Brand not found
                  </td>
                </tr>
              ) : (
                brands.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    {/* Sr No */}
                    <td className="px-4 py-4">{index + 1}</td>

                    {/* Image */}
                    <td className="px-4 py-4">
                      <img
                        src={`${meta.baseurl}${item.image}`}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border"
                      />
                    </td>

                    {/* Brand Name */}
                    <td className="px-4 py-4 font-medium">{item.name}</td>

                    {/* Slug */}
                    <td className="px-4 py-4 text-gray-500">{item.slug}</td>

                    {/* Categories */}
                    <td className="px-4 py-4">
                      {Array.isArray(item.categoryId) ? (
                        <div className="flex flex-wrap gap-2">
                          {item.categoryId.map((cat) => (
                            <span
                              key={cat._id}
                              className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      ) : item.categoryId?.name ? (
                        <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                          {item.categoryId.name}
                        </span>
                      ) : (
                        <span className="text-gray-400">No Category</span>
                      )}
                    </td>

                    {/* Active */}
                    <td className="px-4 py-4 text-center">
                      <Status
                        value={item.isHome}
                        id={item._id}
                        field="isHome"
                        endpoint="brand"
                      />

                      <Status
                        value={item.isPopular}
                        id={item._id}
                        field="isPopular"
                        endpoint="brand"
                      />

                      <Status
                        value={item.isTop}
                        id={item._id}
                        field="isTop"
                        endpoint="brand"
                      />

                      <Status
                        value={item.isBest}
                        id={item._id}
                        field="isBest"
                        endpoint="brand"
                      />
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <Link href={`/admin/Brand/edit/${item.slug}`}>
                          <button className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-200">
                            <FaEdit />
                          </button>
                        </Link>

                        <Delete id={item._id} endpoint="brand" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
