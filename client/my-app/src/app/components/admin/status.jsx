"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { notify } from "@/app/components/utils/helper";

export default function Status({ value, id, field, endpoint }) {
  const router = useRouter();

  const statusHandler = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/ref/${endpoint}/update/${id}`,
        { field }
      );

      notify(response.data.message, response.data.success);

      if (response.data.success) {
        router.refresh();
      }
    } catch (error) {
        
      notify(
        error.response?.data?.message || "Internal Server Error",
        false
      );
    }
  };

  const label = {
    status: ["Active", "Inactive"],
    top: ["Top", "Not Top"],
    popular: ["Yes", "No"],
    best: ["Yes", "No"],
    home: ["Yes", "No"],
  };

  const [trueLabel, falseLabel] =
    label[field] || ["Yes", "No"];

  return (
    <button
      onClick={statusHandler}
      className={`px-3 py-1 rounded-full text-xs ${
        value
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {value ? trueLabel : falseLabel}
    </button>
  );
}