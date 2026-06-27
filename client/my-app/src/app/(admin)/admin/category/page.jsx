import { FaEdit } from "react-icons/fa";
import { getcategory } from "@/Api-call/get_Api";
import Link from "next/link";
import Status from "@/app/components/admin/status";
import Delete from "@/app/components/admin/Delete";

export default async function CategoryPage() {
  let categories = [];
  let meta = {};

  try {
    const res = await getcategory();
    categories = res.data || [];
    meta = res.meta || {};
  } catch (error) {
    console.log(error);
  }
return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Categories
          </h1>
          <p className="text-slate-500 text-sm">
            Manage all product categories
          </p>
        </div>

        <Link href="/admin/category/add">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow">
            + Add Category
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="px-4 py-4 text-left">#</th>
                <th className="px-4 py-4 text-left">Image</th>
                <th className="px-4 py-4 text-left">Slug</th>
                <th className="px-4 py-4 text-left">Category</th>
                <th className="px-4 py-4 text-center">Status</th>
                 <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-10 text-gray-500"
                  >
                    No Categories Found
                  </td>
                </tr>
              ) : (
                categories.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-slate-50 transition-all"
                  >
                    {/* Sr No */}
                    <td className="px-4 py-4 font-medium">
                      {index + 1}
                    </td>

                    {/* Image */}
                    <td className="px-4 py-4">
                      <img
                        src={`${meta.baseurl}${item.image}`}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-800">
                        {item.name}
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-4 py-4 text-slate-500">
                      {item.slug}
                    </td>

                    {/* Status */}
                   <Status
               value={item.isActive}
                  id={item._id}
                     field="isActive"
                       endpoint="category"
                              />

<Status
  value={item.isHome}
  id={item._id}
  field="isHome"
  endpoint="category"
/>

<Status
  value={item.isPopular}
  id={item._id}
  field="isPopular"
  endpoint="category"
/>

<Status
  value={item.isTop}
  id={item._id}
  field="isTop"
  endpoint="category"
/>

<Status
  value={item.isBest}
  id={item._id}
  field="isBest"
  endpoint="category"
/>
                    {/* Action */}
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/category/edit/${item.slug}`}
                        >
                          <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg">
                            <FaEdit />
                          </button>
                        </Link>

                        <Delete
                          id={item._id}
                          endpoint="category"
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
    </div>
  );
}