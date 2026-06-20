import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Shield, ArrowRight, Truck } from "lucide-react";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { order_id: string; paymentMethod?: string };
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const isCod = searchParams.paymentMethod === "cod";

  return (
    <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">Thank you for your purchase, your order has been placed!</p>
          <p className="text-sm text-gray-400 mb-6">
            Order #{searchParams.order_id?.slice(0, 8).toUpperCase()}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-8">
            {isCod ? (
              <><Truck className="h-4 w-4 text-green-600" />Pay with cash upon delivery — have exact change ready.</>
            ) : (
              <><Shield className="h-4 w-4 text-green-600" />Your order is being processed and will ship soon.</>
            )}
          </div>
          <div className="space-y-3">
            <Link href="/account/orders">
              <Button className="w-full">
                View My Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="w-full mt-1">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}