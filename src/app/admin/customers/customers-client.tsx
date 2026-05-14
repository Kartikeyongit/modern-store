"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Mail, ShoppingBag } from "lucide-react";

export function AdminCustomersClient({ initialCustomers }: { initialCustomers: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredCustomers = initialCustomers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = initialCustomers.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">View and manage your customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalCustomers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">New This Month</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {initialCustomers.filter((c) => {
              const created = new Date(c.createdAt);
              const now = new Date();
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {customer.name?.charAt(0) || customer.email?.charAt(0) || "?"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name || "No Name"}</h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenMenuId(openMenuId === customer.id ? null : customer.id)}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                {openMenuId === customer.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                      <button onClick={() => setOpenMenuId(null)} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />Send Email
                      </button>
                      <button onClick={() => setOpenMenuId(null)} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <ShoppingBag className="h-4 w-4 mr-2 text-gray-400" />View Orders
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500">Joined</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(customer.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers found.</p>
        </div>
      )}
    </div>
  );
}