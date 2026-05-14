import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck, Shield, Package } from "lucide-react";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

// Helper to safely get the first product image
function getImageUrl(product: any): string | null {
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

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, params.id),
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
  });

  if (!order || order.userId !== (session.user as any).id) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Order Not Found</h1>
          <Link href="/account/orders">
            <Button variant="outline" className="mt-4">Back to Orders</Button>
          </Link>
        </div>
      </main>
    );
  }

  let shippingInfo: any = null;
  if (order.shippingAddress) {
    try {
      shippingInfo = typeof order.shippingAddress === 'string'
        ? JSON.parse(order.shippingAddress)
        : order.shippingAddress;
    } catch {
      shippingInfo = null;
    }
  }

  const orderItems = order.items || [];
  const itemsTotal = orderItems.reduce(
    (sum: number, item: any) => sum + (item.quantity || 0) * (item.unitPrice || 0),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/account/orders" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Order #{order.id.slice(0, 8).toUpperCase()}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date unavailable"}
              </p>
            </div>
            <Badge className={statusColors[order.status || "Pending"] || ""}>
              {order.status || "Pending"}
            </Badge>
          </div>

          {/* Items with Images */}
          <div className="border-t pt-6 space-y-4">
            {orderItems.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No items in this order.</p>
            ) : (
              orderItems.map((item: any) => {
                const imageUrl = getImageUrl(item.product);
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
                      <p className="text-sm font-medium text-gray-900">
                        {item.product?.name || "Product"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity || 0} × ${(item.unitPrice || 0).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Totals */}
          <div className="border-t mt-6 pt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {order.total > 100 ? "Free" : "$9.99"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${(order.total * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span>${(order.total || 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Info */}
          {shippingInfo && (
            <div className="border-t mt-6 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-4 w-4 text-black" />
                <h3 className="text-sm font-semibold text-gray-900">Shipping Address</h3>
              </div>
              <p className="text-sm text-gray-600">
                {shippingInfo.firstName} {shippingInfo.lastName}<br />
                {shippingInfo.address}<br />
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
              </p>
            </div>
          )}

          {/* Payment Info */}
          <div className="border-t mt-6 pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-black" />
              <h3 className="text-sm font-semibold text-gray-900">Payment</h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={order.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}>
                {order.paymentStatus || "Pending"}
              </Badge>
              <span className="text-sm text-gray-500">via Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}