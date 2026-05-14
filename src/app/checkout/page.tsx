"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/cart";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  Truck,
  Shield,
  ChevronRight,
  Plus,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Confirmation" },
];

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, subtotal, removeItem, updateQuantity } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [addressesLoading, setAddressesLoading] = useState(true);

  const shipping = subtotal() > 100 ? 0 : 9.99;
  const tax = subtotal() * 0.08;
  const total = subtotal() + shipping + tax;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/checkout");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchAddresses = async () => {
      setAddressesLoading(true);
      try {
        const res = await fetch("/api/addresses");
        if (res.ok) {
          const data = await res.json();
          setSavedAddresses(data);

          const defaultAddr = data.find((a: any) => a.isDefault);
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
            setShippingInfo({
              firstName: defaultAddr.firstName,
              lastName: defaultAddr.lastName,
              email: defaultAddr.email,
              phone: defaultAddr.phone,
              address: defaultAddr.address,
              city: defaultAddr.city,
              state: defaultAddr.state,
              zip: defaultAddr.zip,
              country: defaultAddr.country || "United States",
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      } finally {
        setAddressesLoading(false);
      }
    };
    if (session) fetchAddresses();
  }, [session]);

  const selectAddress = (addr: any) => {
    setSelectedAddressId(addr.id);
    setShippingInfo({
      firstName: addr.firstName,
      lastName: addr.lastName,
      email: addr.email,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country || "United States",
    });
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: useCartStore.getState().items,
          shippingInfo,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </main>
    );
  }

  if (status === "unauthenticated") return null;

  if (items.length === 0 && currentStep !== 3) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Add some products to your cart before checking out.</p>
            <Link href="/shop">
              <Button className="mt-6">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>

        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={cn("flex items-center gap-2", currentStep >= step.id ? "text-black" : "text-gray-400")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    currentStep > step.id ? "bg-black text-white" : currentStep === step.id ? "bg-black text-white border-3 border-gray-400" : "bg-gray-100 text-gray-400"
                  )}>
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span className={cn("text-sm font-medium hidden sm:block", currentStep >= step.id ? "text-gray-900" : "text-gray-400")}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("w-12 sm:w-20 h-0.5 mx-2", currentStep > step.id ? "bg-black" : "bg-gray-200")} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-sm border p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="h-6 w-6 text-black" />
                    <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                  </div>

                  {/* Saved Addresses */}
                  {addressesLoading ? (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Addresses</h3>
                      <div className="space-y-2">
                        <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                        <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                      </div>
                    </div>
                  ) : savedAddresses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Addresses</h3>
                      <div className="space-y-2">
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr.id}
                            onClick={() => selectAddress(addr)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                              selectedAddressId === addr.id ? "border-black bg-gray-100" : "border-gray-200 hover:border-gray-300"
                            )}
                          >
                            <MapPin className={cn("h-5 w-5 flex-shrink-0", selectedAddressId === addr.id ? "text-black" : "text-gray-400")} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{addr.firstName} {addr.lastName}</p>
                              <p className="text-xs text-gray-500 truncate">{addr.address}, {addr.city}, {addr.state} {addr.zip}</p>
                            </div>
                            {addr.isDefault && (
                              <Badge className="text-xs bg-gray-100 text-gray-600 border-0 flex-shrink-0">Default</Badge>
                            )}
                          </div>
                        ))}
                        {!addressesLoading && savedAddresses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setShowAddressForm(!showAddressForm)}
                            className="flex items-center gap-2 text-sm text-black hover:text-gray-700 font-medium mt-2"
                          >
                            <Plus className="h-4 w-4" />
                            {showAddressForm ? "Cancel" : "Add New Address"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Shipping Form */}
                  {!addressesLoading && (!savedAddresses.length || showAddressForm) && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const saveCheckbox = document.getElementById("saveAddress") as HTMLInputElement;
                        if (saveCheckbox?.checked && session) {
                          await fetch("/api/addresses", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ ...shippingInfo, label: "Shipping" }),
                          });
                          const res = await fetch("/api/addresses");
                          const data = await res.json();
                          setSavedAddresses(data);
                          setShowAddressForm(false);
                        }
                        setCurrentStep(2);
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <Input required value={shippingInfo.firstName} onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} placeholder="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <Input required value={shippingInfo.lastName} onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} placeholder="Doe" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <Input type="email" required value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} placeholder="john@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <Input type="tel" required value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} placeholder="(555) 123-4567" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <Input required value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} placeholder="123 Main Street" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="col-span-2 sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <Input required value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} placeholder="New York" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                          <Input required value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} placeholder="NY" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP</label>
                          <Input required value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} placeholder="10001" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input type="checkbox" id="saveAddress" className="rounded border-gray-300" />
                        <label htmlFor="saveAddress" className="text-sm text-gray-600">Save this address for future orders</label>
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors">
                        Continue to Payment
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  )}

                  {/* Continue button when using saved address */}
                  {!addressesLoading && savedAddresses.length > 0 && !showAddressForm && (
                    <Button
                      type="button"
                      size="lg"
                      disabled={!selectedAddressId}
                      className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      onClick={() => setCurrentStep(2)}
                    >
                      {selectedAddressId ? (
                        <>
                          Continue to Payment
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </>
                      ) : (
                        "Select an address to continue"
                      )}
                    </Button>
                  )}
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-sm border p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-6 w-6 text-black" />
                    <h2 className="text-xl font-bold text-gray-900">Review & Pay</h2>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Shipping to:</span>
                      <button onClick={() => setCurrentStep(1)} className="text-sm text-black hover:text-gray-700 font-medium">Edit</button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.product.images?.[0] || "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=100&h=100&fit=crop"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Lock className="h-4 w-4" />
                    You'll be redirected to Stripe to complete your payment securely
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    disabled={isProcessing}
                    onClick={handlePaymentSubmit}
                    className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Redirecting to Stripe...
                      </>
                    ) : (
                      <>
                        Pay ${total.toFixed(2)}
                        <Lock className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-500 mb-2">Thank you for your purchase, {shippingInfo.firstName}!</p>
                  <p className="text-sm text-gray-400 mb-8">Order #MOD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mb-8">
                    <Shield className="h-5 w-5 text-green-600" />
                    Your order is being processed and will ship soon.
                  </div>
                  <Link href="/shop">
                    <Button size="lg">Continue Shopping</Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <ScrollArea className="max-h-64 mb-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.product.images?.[0] || "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=100&h=100&fit=crop"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Free</Badge> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="h-3 w-3" />
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}