"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { client, notify } from "@/app/components/utils/helper";

export default function AddColorPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [colorCode, setColorCode] = useState("#000000");

  const nameref = useRef(null);
  const slugref = useRef(null);

  // Random Color Generator
  const generateColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  // Name -> Slug + Auto Color
  const createSlug = () => {
    let value = nameref.current.value;

    if (!value) {
      slugref.current.value = "";
      return;
    }

    value =
      value.charAt(0).toUpperCase() +
      value.slice(1).toLowerCase();

    nameref.current.value = value;

    slugref.current.value = value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    setColorCode(generateColor());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: nameref.current.value,
        slug: slugref.current.value,
        code: colorCode,
      };

      const response = await client.post(
        "/color/create",
        payload
      );

      notify(
        response.data.message,
        response.data.success
      );

      if (response.data.success) {
        router.push("/admin/color");
      }
    } catch (error) {
      notify(
        error.response?.data?.message ||
          "Internal Server Error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">
        Add Color
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium">
            Color Name
          </label>

          <input
            type="text"
            ref={nameref}
            onChange={createSlug}
            placeholder="Red"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            type="text"
            ref={slugref}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        {/* Color Code */}
        <div>
          <label className="block mb-2 font-medium">
            Color Code
          </label>

          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={colorCode}
              onChange={(e) =>
                setColorCode(e.target.value)
              }
              className="w-16 h-12 cursor-pointer"
            />

            <input
              type="text"
              value={colorCode}
              readOnly
              className="flex-1 border rounded-lg p-3 bg-gray-100"
            />
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block mb-2 font-medium">
            Preview
          </label>

          <div
            className="w-24 h-24 rounded-lg border"
            style={{
              backgroundColor: colorCode,
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Color"}
        </button>
      </form>
    </div>
  );
}