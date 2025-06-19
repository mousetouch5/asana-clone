// dashboard/components/Sidebar.tsx
"use client";

import { Home, Users, BarChart3, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Users", href: "#", icon: Users, current: false },
  { name: "Analytics", href: "#", icon: BarChart3, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
];

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white">
            <div className="flex h-16 justify-between items-center px-4">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm rounded-md font-medium ${
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-4">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm rounded-md font-medium ${
                item.current
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
