"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Mail, ShoppingBag, Trash2, DollarSign, Package } from "lucide-react";

export interface Customer {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date | null;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: Date | null;
}

export function AdminCustomersClient({
  initialCustomers,
  currentUserId,
}: {
  initialCustomers: Customer[];
  currentUserId: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const newThisMonth = customers.filter((c) => {
    if (!c.createdAt) return false;
    const created = new Date(c.createdAt);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setDeleting(true);
    setDeleteError(null);

    try {
      const res = await fetch(`/api/admin/customers/${confirmDeleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setCustomers((prev) => prev.filter((c) => c.id !== confirmDeleteId));
        setConfirmDeleteId(null);
      } else {
        setDeleteError(data.error || "Failed to delete user.");
      }
    } catch {
      setDeleteError("Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  const targetCustomer = confirmDeleteId
    ? customers.find((c) => c.id === confirmDeleteId)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">View and manage your customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalCustomers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">New This Month</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{newThisMonth}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const isActive = customer.lastOrderDate
            ? Date.now() - new Date(customer.lastOrderDate).getTime() < 30 * 24 * 60 * 60 * 1000
            : false;
          const initial = customer.name?.charAt(0) || customer.email?.charAt(0) || "?";

          return (
            <div
              key={customer.id}
              className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Top row: avatar + name + menu */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-14" size="lg">
                    <AvatarFallback className="bg-gray-800 text-white font-bold text-lg">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {customer.name || "No Name"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-center size-8 rounded-lg hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem asChild>
                      <a href={`mailto:${customer.email}`} className="flex items-center cursor-pointer">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/orders" className="flex items-center cursor-pointer">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        View Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      disabled={customer.id === currentUserId}
                      onSelect={(e) => {
                        if (customer.id === currentUserId) {
                          e.preventDefault();
                          return;
                        }
                        setConfirmDeleteId(customer.id);
                      }}
                      className={customer.id === currentUserId ? "text-gray-400 cursor-not-allowed" : "text-red-600 focus:text-red-600 focus:bg-red-50"}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {customer.id === currentUserId ? "Cannot delete yourself" : "Delete Account"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Stats row: orders + spent */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span>{customer.orderCount} {customer.orderCount === 1 ? "order" : "orders"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>${customer.totalSpent.toFixed(2)}</span>
                </div>
              </div>

              {/* Bottom row: joined date + active indicator */}
              <div className="pt-4 border-t mt-auto flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Joined</p>
                  <p className="text-sm font-medium text-gray-900">
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-300"}`} />
                  <span className="text-xs text-gray-500">{isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers found.</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDeleteId} onOpenChange={(open) => { if (!open) setConfirmDeleteId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete <span className="font-semibold text-gray-900">{targetCustomer?.name || targetCustomer?.email}</span>?
              All their orders, reviews, and saved addresses will be removed. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <p className="text-sm text-red-600 px-6">{deleteError}</p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setConfirmDeleteId(null); setDeleteError(null); }} disabled={deleting}>
              Cancel
            </Button>
            <Button onClick={handleDelete} disabled={deleting} className="bg-red-600 text-white hover:bg-red-700 border-2 border-red-600">
              {deleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
