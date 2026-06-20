"use client";

import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { client, notify } from "@/app/components/utils/helper";

export default function Delete({ id, endpoint }) {
  const Deletebtn = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await client.delete(`/${endpoint}/delete/${id}`);

        notify(response.data.message, response.data.success);

        if (response.data.success) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your record has been deleted.",
            icon: "success",
          });

          window.location.reload();
        }
      } catch (error) {
        notify(
          error.response?.data?.message || "Internal Server Error",
          false
        );
      }
    }
  };

  return (
    <button
      onClick={Deletebtn}
      className="bg-red-100 p-2 rounded-lg text-red-600 hover:bg-red-200"
    >
      <FaTrash />
    </button>
  );
}