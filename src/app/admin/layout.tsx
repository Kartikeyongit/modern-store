import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  ChevronLeft
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r z-30 flex flex-col">
        {/* Admin Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b shrink-0">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Store</span>
          </Link>
          <div className="w-px h-6 bg-gray-200" />
          <h1 className="text-lg font-bold text-gray-900">Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
              {session.user.name?.charAt(0) || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="min-h-screen p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
