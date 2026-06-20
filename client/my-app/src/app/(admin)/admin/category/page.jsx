import { FaEdit, FaTrash } from "react-icons/fa";
import { getcategory } from "@/Api-call/get_Api";
import Link from "next/link";
import Status from "@/app/components/admin/status";
import Delete from "@/app/components/admin/Delete";

export default async function CategoryPage() {
  let categories = [];
  let meta = {};

  try {
    const res = await getcategory();
    categories = res.data;
    meta = res.meta;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <Link href="/admin/category/add">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow">
            + Add Category
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg max-h-[600px] overflow-y-auto overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
  <tr className="bg-slate-100 text-slate-700">
    <th className="px-6 py-4 text-left">Sr no.</th>
    <th className="px-6 py-4 text-left">Image</th>
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
            {categories.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6">
                  Category not found
                </td>
              </tr>
            ) : (
              categories.map((item,index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {index+1}
                  </td>

                  {/* Image */}
                    <td className="px-6 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td> 
                


                  {/* Name */}
                  
                  <td className="px-6 py-4 font-medium">
                    {item.name}
                  </td>

                  {/* Slug */}
                  <td className="px-6 py-4 text-gray-500">
                    {item.slug}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <Status
                      value={item.status}
                      id={item._id}
                      field="status"
                      endpoint="category"
                    />
                  </td>

                  {/* Home */}
                  <td className="px-6 py-4 text-center">
                    <Status
                      value={item.home}
                      id={item._id}
                      field="home"
                      endpoint="category"
                    />
                  </td>

                  {/* Popular */}
                  <td className="px-6 py-4 text-center">
                    <Status
                      value={item.popular}
                      id={item._id}
                      field="popular"
                      endpoint="category"
                    />
                  </td>

                  {/* Top */}
                  <td className="px-6 py-4 text-center">
                    <Status
                      value={item.top}
                      id={item._id}
                      field="top"
                      endpoint="category"
                    />
                  </td>

                  {/* Best */}
                  <td className="px-6 py-4 text-center">
                    <Status
                      value={item.best}
                      id={item._id}
                      field="best"
                      endpoint="category"
                    />
                  </td>
                 {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-200">
                        <FaEdit />
                      </button>

                       <Delete id ={item._id} endpoint="category"/>
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