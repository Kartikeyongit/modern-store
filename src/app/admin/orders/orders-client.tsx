"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Download } from "lucide-react";
import { RefreshCw } from "lucide-react";

const statusColors: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const paymentColors: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700",
};

interface Order {
  id: string;
  status: string | null;
  paymentStatus: string | null;
  paymentMethod: string | null;
  trackingNumber: string | null;
  carrier: string | null;
  total: number | null;
  createdAt: Date | null;
  user?: { name?: string | null; email?: string | null } | null;
  items?: { id: string }[] | null;
}

export function AdminOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [trackingDraft, setTrackingDraft] = useState<Record<string, { trackingNumber: string; carrier: string }>>({});

  const filteredOrders = orders.filter((order) => {
    const orderId = order.id?.slice(0, 8) || "";
    const customerName = order.user?.name || "";
    const customerEmail = order.user?.email || "";
    const matchesSearch =
      orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const updateOrderStatus = async (orderId: string, status: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    ));

    try {
      await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
      });
    } catch (error) {
      console.error("Failed to update order:", error);
      window.location.reload();
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, paymentStatus } : o
    ));

    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, paymentStatus }),
      });
    } catch (error) {
      console.error("Failed to update payment:", error);
      window.location.reload();
    }
  };

  const updateTracking = async (orderId: string) => {
    const draft = trackingDraft[orderId];
    if (!draft) return;

    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, trackingNumber: draft.trackingNumber, carrier: draft.carrier } : o
    ));

    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, trackingNumber: draft.trackingNumber, carrier: draft.carrier }),
      });
      setTrackingDraft((prev) => { const next = { ...prev }; delete next[orderId]; return next; });
    } catch (error) {
      console.error("Failed to update tracking:", error);
      window.location.reload();
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Manage customer orders ({orders.length} total)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {orders.filter((o) => o.status === "Pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders by ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-200 text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Order ID</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Items</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Total</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Payment</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Method</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Tracking</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-sm text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      #{order.id?.slice(0, 8).toUpperCase() || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.user?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.user?.email || "No email"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.items?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${(order.total || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                          value={order.status || "Pending"}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 cursor-pointer ${
                          statusColors[order.status || "Pending"]
                          }`}
                      >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                    <select
                        value={order.paymentStatus || "Pending"}
                        onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 cursor-pointer ${
                        paymentColors[order.paymentStatus || "Pending"]
                        }`}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.paymentMethod === "cod" ? "COD" : "Stripe"}
                    </td>
                    <td className="px-6 py-4">
                      {(order.status === "Shipped" || order.status === "Delivered") ? (
                        <div className="space-y-1">
                          {order.trackingNumber || order.carrier ? (
                            <div className="text-[11px] text-gray-500 leading-tight">
                              <p className="font-medium text-gray-700">{order.carrier || "Carrier"}</p>
                              <p className="truncate max-w-[140px]">{order.trackingNumber}</p>
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <input
                                placeholder="Carrier"
                                value={trackingDraft[order.id]?.carrier ?? ""}
                                onChange={(e) =>
                                  setTrackingDraft((prev) => ({
                                    ...prev,
                                    [order.id]: { ...prev[order.id], carrier: e.target.value, trackingNumber: prev[order.id]?.trackingNumber ?? "" },
                                  }))
                                }
                                className="w-16 text-[11px] px-1 py-0.5 border rounded"
                              />
                              <input
                                placeholder="Tracking #"
                                value={trackingDraft[order.id]?.trackingNumber ?? ""}
                                onChange={(e) =>
                                  setTrackingDraft((prev) => ({
                                    ...prev,
                                    [order.id]: { ...prev[order.id], trackingNumber: e.target.value, carrier: prev[order.id]?.carrier ?? "" },
                                  }))
                                }
                                className="w-20 text-[11px] px-1 py-0.5 border rounded"
                              />
                              <button
                                onClick={() => updateTracking(order.id)}
                                className="text-[11px] text-white bg-black px-1.5 py-0.5 rounded hover:bg-gray-800"
                              >
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}