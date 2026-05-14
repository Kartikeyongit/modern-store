import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOutAction } from "./actions";
import { User, Package, Heart, Settings, LogOut, ShoppingBag } from "lucide-react";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const menuItems = [
    {
      icon: Package,
      label: "Orders",
      description: "View your order history",
      href: "/account/orders",
    },
    {
      icon: Heart,
      label: "Wishlist",
      description: "Your saved items",
      href: "/account/wishlist",
    },
    {
      icon: User,
      label: "Profile",
      description: "Manage your account details",
      href: "/account/profile",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Preferences and security",
      href: "/account/settings",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {session.user.name || "Welcome!"}
              </h1>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-800 group-hover:text-white transition-colors">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/shop">
            <Button variant="outline">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <form action={signOutAction}>
            <Button variant="outline" className="text-black hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}