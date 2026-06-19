"use client";

import {
  FiSearch,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function Header() {
  return (
   <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-50">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-[400px]">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full ml-3 bg-transparent outline-none"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative text-2xl text-gray-600 hover:text-black">
          <FiBell />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="text-2xl text-gray-600 hover:text-black">
          <FiSettings />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <FiUser />
          </div>

          <div className="hidden sm:block">
            <h3 className="font-semibold text-gray-800">
              Admin
            </h3>
            <p className="text-sm text-gray-500">
              administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}