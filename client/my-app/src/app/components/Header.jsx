"use client"
import React from "react";
import { ShoppingCart, Search, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-600">
            ReLaptop
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center border rounded-lg overflow-hidden w-[400px]">
          <input
            type="text"
            placeholder="Search refurbished laptops..."
            className="w-full px-4 py-2 outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2">
            <Search size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-8 font-medium text-gray-700">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/laptops" className="hover:text-blue-600">
            Laptops
          </a>
          <a href="/desktop" className="hover:text-blue-600">
            Desktops
          </a>
          <a href="/accessories" className="hover:text-blue-600">
            Accessories
          </a>
          <a href="/contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="relative">
            <ShoppingCart className="text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <button className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>

          <button className="lg:hidden">
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex border rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search laptops..."
            className="w-full px-4 py-2 outline-none"
          />
          <button className="bg-blue-600 text-white px-4">
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}