"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, Heart, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useSearchStore } from "@/store/search";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Sale", href: "/sale" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const cartItems = useCartStore((state) => state.items);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const openCart = useCartStore((state) => state.openCart);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdminPage = pathname.startsWith("/admin");
  const shouldShowDark = true;

  const searchQuery = useSearchStore((state) => state.query);
  const searchResults = useSearchStore((state) => state.results);
  const searchIsOpen = useSearchStore((state) => state.isOpen);
  const setSearchQuery = useSearchStore((state) => state.setQuery);
  const setSearchOpen = useSearchStore((state) => state.setOpen);
  const setSearchResults = useSearchStore((state) => state.setResults);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchOpen]);

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, setSearchResults]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Hide navbar on admin pages
  if (isAdminPage) return null;

  return (
    <>
      <motion.nav
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          shouldShowDark
            ? "bg-white/80 backdrop-blur-md shadow-lg border-b"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <span className="text-xl font-bold text-black">
                Borrow
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    shouldShowDark
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <div ref={searchRef} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchOpen(!searchIsOpen);
                    if (!searchIsOpen) {
                      setTimeout(() => {
                        const input = document.getElementById("nav-search-input");
                        input?.focus();
                      }, 100);
                    }
                  }}
                  className={shouldShowDark ? "text-gray-700" : "text-black"}
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Search Dropdown */}
                {searchIsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">
                    <div className="p-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="nav-search-input"
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSearchOpen(true);
                          }}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Results */}
                    {searchQuery.length >= 2 && (
                      <div className="border-t">
                        {searchResults.length > 0 ? (
                          <>
                            {searchResults.map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                                  {product.images?.[0] && (
                                    <Image
                                      src={product.images[0]}
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                      sizes="40px"
                                    />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    ${product.price.toFixed(2)}
                                  </p>
                                </div>
                              </Link>
                            ))}
                            <Link
                              href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="block text-center text-sm font-medium text-black hover:bg-gray-50 py-3 border-t"
                            >
                              View all results
                            </Link>
                          </>
                        ) : (
                          <div className="px-4 py-6 text-center text-sm text-gray-500">
                            No products found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link href="/account/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className={shouldShowDark ? "text-gray-700" : "text-black"}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* User Menu */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gray-800 text-white text-xs font-bold">
                          {session.user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-3 w-3 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5 font-normal">
                        {session.user?.email}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders" className="cursor-pointer">
                        <ShoppingBag className="h-4 w-4" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <LayoutDashboard className="h-4 w-4" />
                        Admin View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" asChild>
                      <button onClick={() => signOut()} className="cursor-pointer w-full">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={shouldShowDark ? "text-gray-700" : "text-black"}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className={`relative ${shouldShowDark ? "text-gray-700" : "text-black"}`}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-gray-800 text-white text-xs font-bold"
                  >
                    {itemsCount}
                  </motion.span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${shouldShowDark ? "text-gray-700" : "text-black"}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative h-full w-full max-w-sm ml-auto bg-white shadow-xl p-6 pt-20">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-lg font-medium text-gray-900 hover:text-gray-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {session && (
                <>
                  <hr className="border-gray-200" />
                  <div className="space-y-3 pt-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Account</p>
                    <Link
                      href="/account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-base text-gray-700 hover:text-black transition-colors"
                    >
                      <User className="h-5 w-5 text-gray-400" />
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-base text-gray-700 hover:text-black transition-colors"
                    >
                      <ShoppingBag className="h-5 w-5 text-gray-400" />
                      Orders
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-base text-gray-700 hover:text-black transition-colors"
                    >
                      <LayoutDashboard className="h-5 w-5 text-gray-400" />
                      Admin View
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-3 text-base text-red-600 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="h-5 w-5 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}