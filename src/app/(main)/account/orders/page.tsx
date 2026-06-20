import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

const paymentColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Refunded: "bg-red-100 text-red-700",
};

// Helper to safely get the first product image
function getImageUrl(product: Record<string, unknown> | null): string | null {
  try {
    let images = product?.images;
    if (!images) return null;
    if (typeof images === 'string') {
      images = JSON.parse(images);
    }
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    return null;
  } catch {
    return null;
  }
}

export default async function UserOrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const userId = (session.user as { id: string }).id;

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, userId),
    orderBy: desc(orders.createdAt),
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/account" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Account
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500 mt-1">Track and manage your orders</p>
          </div>
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
            <p className="text-gray-500 mt-2">Start shopping to see your orders here.</p>
            <Link href="/shop">
              <Button className="mt-6">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => {
              const orderItems = order.items || [];
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order #{order.id?.slice(0, 8).toUpperCase() || "N/A"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Date unavailable"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={paymentColors[order.paymentStatus || ""] || ""}>
                        {order.paymentStatus || "Pending"}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-700">
                        {order.paymentMethod === "cod" ? "COD" : "Stripe"}
                      </Badge>
                      <Badge className={statusColors[order.status || ""] || ""}>
                        {order.status || "Pending"}
                      </Badge>
                    </div>
                    {(order.status === "Shipped" || order.status === "Delivered") && (order.trackingNumber || order.carrier) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {order.carrier && <span>{order.carrier}</span>}
                        {order.carrier && order.trackingNumber && <span> — </span>}
                        {order.trackingNumber && <span>Track: {order.trackingNumber}</span>}
                      </p>
                    )}
                  </div>

                  {/* Order Items with Product Images */}
                  {orderItems.length > 0 && (
                    <div className="border-t pt-4 space-y-3">
                      {orderItems.map((item) => {
                        const imageUrl = getImageUrl(item.product);
                        return (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={item.product?.name || "Product"}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.product?.name || "Product"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity || 0} × ${(item.unitPrice || 0).toFixed(2)}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              ${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="border-t mt-4 pt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {orderItems.length} {orderItems.length === 1 ? "item" : "items"} · Total
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-gray-900">
                        ${(order.total || 0).toFixed(2)}
                      </p>
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}