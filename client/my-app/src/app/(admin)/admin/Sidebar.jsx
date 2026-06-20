"use client";

import Link from "next/link";
import {
  FiGrid,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiLayers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { title: "Dashboard", icon: <FiGrid />, href: "/admin" },
    { title: "Products", icon: <FiBox />, href: "/admin/products" },
    { title: "Orders", icon: <FiShoppingCart />, href: "/admin/orders" },
    { title: "Users", icon: <FiUsers />, href: "/admin/users" },
    { title: "Categories", icon: <FiLayers />, href: "/admin/categories" },
    { title: "Settings", icon: <FiSettings />, href: "/admin/settings" },
  ];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } h-screen sticky top-0 bg-slate-900 text-white flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {open && (
          <h1 className="text-2xl font-bold text-blue-500">
            ReLaptop
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-xl p-2 rounded hover:bg-slate-800"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className={`flex items-center ${
                  open ? "gap-4 px-4 justify-start" : "justify-center"
                } py-3 rounded-lg hover:bg-slate-800 transition`}
              >
                <span className="text-xl">{item.icon}</span>

                {open && (
                  <span className="whitespace-nowrap">
                    {item.title}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-3">
        <button
          className={`w-full flex items-center ${
            open ? "gap-4 px-4 justify-start" : "justify-center"
          } py-3 rounded-lg hover:bg-red-600 transition`}
        >
          <FiLogOut className="text-xl" />
          {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}