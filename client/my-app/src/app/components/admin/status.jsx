"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { notify } from "@/app/components/utils/helper";

export default function Status({ value, id, field, endpoint }) {
  const [status, setStatus] = useState(value);

   
  useEffect(() => {
    setStatus(value);
  }, [value]);

  const statusHandler = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/ref/${endpoint}/update/${id}`,
        { field }
      );

      notify(response.data.message, response.data.success);

      if (response.data.success) {
        setStatus((prev) => !prev);
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

  const [trueLabel, falseLabel] = label[field] || ["Yes", "No"];

  return (
    <button
      onClick={statusHandler}
      className={`px-3 py-1 rounded-full text-xs ${
        status
          ? "bg-green-200v  text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status ? trueLabel : falseLabel}
    </button>
  );
}