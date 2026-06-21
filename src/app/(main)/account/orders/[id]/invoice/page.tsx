import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orders, storeSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InvoicePrintButton } from "./invoice-client";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const [order, settings] = await Promise.all([
    db.query.orders.findFirst({
      where: eq(orders.id, params.id),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    }),
    db.query.storeSettings.findFirst({
      where: eq(storeSettings.id, "main"),
    }),
  ]);

  if (
    !order ||
    order.userId !== (session.user as { id: string }).id ||
    order.status !== "Delivered" ||
    order.paymentStatus !== "Paid"
  ) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Invoice Not Available</h1>
          <p className="text-gray-500 mt-2">Invoices are only available for paid and delivered orders.</p>
          <Link href="/account/orders">
            <span className="inline-flex items-center text-sm text-gray-500 hover:text-black mt-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Orders
            </span>
          </Link>
        </div>
      </main>
    );
  }

  let shippingInfo: ShippingInfo | null = null;
  if (order.shippingAddress) {
    try {
      shippingInfo = (typeof order.shippingAddress === "string"
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
  const storeName = settings?.storeName || "Borrow";
  const supportEmail = settings?.supportEmail || "support@borrow.com";
  const shippingThreshold = settings?.shippingThreshold ?? 100;
  const shippingRate = settings?.shippingRate ?? 9.99;
  const taxRate = settings?.taxRate ?? 0.08;
  const shipping = itemsTotal > shippingThreshold ? 0 : shippingRate;
  const tax = itemsTotal * taxRate;

  return (
    <main className="min-h-screen bg-gray-100 pt-20 print:bg-white">
      {/* Print button — hidden when printing */}
      <div className="max-w-3xl mx-auto px-4 py-6 print:hidden">
        <div className="flex items-center justify-between mb-6">
          <Link href={`/account/orders/${order.id}`} className="inline-flex items-center text-sm text-gray-500 hover:text-black">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Order
          </Link>
          <InvoicePrintButton />
        </div>
      </div>

      {/* Invoice */}
      <div className="max-w-3xl mx-auto px-4 pb-16 print:pb-0 print:mx-0 print:max-w-none">
        <div className="bg-white rounded-2xl shadow-sm border print:rounded-none print:shadow-none print:border-0 p-8 md:p-12 print:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-10 print:mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{storeName}</h1>
              <p className="text-sm text-gray-500 mt-1">{supportEmail}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900">INVOICE</h2>
              <p className="text-sm text-gray-500 mt-1">
                #{order.id.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-sm text-gray-500">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t mb-8 print:mb-6" />

          {/* Billing Info */}
          {shippingInfo && (
            <div className="mb-8 print:mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Bill To</h3>
              <p className="text-sm text-gray-600">
                {shippingInfo.firstName} {shippingInfo.lastName}<br />
                {shippingInfo.address}<br />
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
              </p>
            </div>
          )}

          {/* Items Table */}
          <table className="w-full mb-8 print:mb-6">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Item</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Qty</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Price</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 text-sm text-gray-900">{item.product?.name || "Product"}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{item.quantity || 0}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">${(item.unitPrice || 0).toFixed(2)}</td>
                  <td className="py-3 text-sm text-gray-900 text-right font-medium">
                    ${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8 print:mb-6">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total</span>
                <span>${(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t pt-6 print:pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900">Payment:</span>
              <span className={order.paymentStatus === "Paid" ? "text-emerald-700" : ""}>
                {order.paymentStatus}
              </span>
              <span>via {order.paymentMethod === "cod" ? "Cash on Delivery" : "Stripe"}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t mt-8 pt-6 print:mt-6 print:pt-4 text-center">
            <p className="text-xs text-gray-400">Thank you for your order!</p>
            <p className="text-xs text-gray-400 mt-1">
              For questions, contact {supportEmail}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
