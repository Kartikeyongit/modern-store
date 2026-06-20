import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OrderReview } from "./order-review";
import { ArrowLeft, Truck, Shield, Package, Check } from "lucide-react";

const timelineSteps = [
  { key: "Pending", label: "Order Placed" },
  { key: "Processing", label: "Processing" },
  { key: "Shipped", label: "Shipped" },
  { key: "Delivered", label: "Delivered" },
];

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

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

  if (!order || order.userId !== (session.user as { id: string }).id) {
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

  let shippingInfo: ShippingInfo | null = null;
  if (order.shippingAddress) {
    try {
      shippingInfo = (typeof order.shippingAddress === 'string'
        ? JSON.parse(order.shippingAddress)
        : order.shippingAddress) as ShippingInfo;
    } catch {
      shippingInfo = null;
    }
  }

  const orderItems = order.items || [];
  const itemsTotal = orderItems.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0),
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
          <div className="mb-6">
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

          {/* Status Timeline */}
          <div className="border rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Status</h3>
            <div className="relative">
              {order.status === "Cancelled" ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-xs font-bold">✕</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600">Cancelled</p>
                    <p className="text-xs text-gray-500">This order has been cancelled</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-0">
                  {timelineSteps.map((step, index) => {
                    const stepOrder = ["Pending", "Processing", "Shipped", "Delivered"];
                    const currentIdx = stepOrder.indexOf(order.status || "Pending");
                    const stepIdx = stepOrder.indexOf(step.key);
                    const isCompleted = stepIdx < currentIdx;
                    const isCurrent = step.key === order.status;

                    return (
                      <div key={step.key} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                            isCompleted ? "bg-black" : isCurrent ? "bg-black" : "bg-gray-200"
                          )}>
                            {isCompleted ? (
                              <Check className="h-3.5 w-3.5 text-white" />
                            ) : isCurrent ? (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-gray-400" />
                            )}
                          </div>
                          {index < timelineSteps.length - 1 && (
                            <div className={cn(
                              "w-0.5 h-8",
                              isCompleted ? "bg-black" : "bg-gray-200"
                            )} />
                          )}
                        </div>
                        <div className={cn("pb-6", index === timelineSteps.length - 1 && "pb-0")}>
                          <p className={cn(
                            "text-sm font-medium",
                            isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"
                          )}>
                            {step.label}
                          </p>
                          {isCurrent && step.key === "Shipped" && (order.trackingNumber || order.carrier) && (
                            <div className="mt-1 text-xs text-gray-500">
                              <p>{order.carrier && `${order.carrier} — `}{order.trackingNumber}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Tracking Info Card when Shipped/Delivered */}
          {(order.status === "Shipped" || order.status === "Delivered") && (order.trackingNumber || order.carrier) && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-black" />
                <h3 className="text-sm font-semibold text-gray-900">Tracking Information</h3>
              </div>
              <p className="text-sm text-gray-700">
                {order.carrier && <span className="font-medium">{order.carrier}</span>}
                {order.carrier && order.trackingNumber && <span> — </span>}
                {order.trackingNumber && <span>{order.trackingNumber}</span>}
              </p>
            </div>
          )}

          {/* Items with Images */}
          <div className="border-t pt-6 space-y-4">
            {orderItems.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No items in this order.</p>
            ) : (
              orderItems.map((item) => {
                const imageUrl = getImageUrl(item.product);
                return (
                  <div key={item.id}>
                    <div className="flex items-center gap-4">
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
                    {order.status === "Delivered" && item.product?.id && (
                      <OrderReview productId={item.product.id} productName={item.product?.name || "Product"} />
                    )}
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
              <span className="text-sm text-gray-500">via {order.paymentMethod === "cod" ? "Cash on Delivery" : "Stripe"}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}