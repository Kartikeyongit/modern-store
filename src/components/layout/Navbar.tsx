"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, Heart, User } from "lucide-react";
import { useSearchStore } from "@/store/search";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Sale", href: "/sale" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);
  const openCart = useCartStore((state) => state.openCart);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isHomepage = pathname === "/";
  const isAdminPage = pathname.startsWith("/admin");
  const shouldShowDark = !isHomepage || isScrolled;

  const searchStore = useSearchStore();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        searchStore.setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchStore.query.length < 2) {
      searchStore.setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchStore.query)}`);
        const data = await res.json();
        searchStore.setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchStore.query]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    
      if (isHomepage) {
        setIsVisible(scrollY > window.innerHeight * 0.5);
      } else {
        setIsVisible(true);
      }
    };
  
    if (!isHomepage) {
      setIsVisible(true);
    }
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  // Hide navbar on admin pages
  if (isAdminPage) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
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
                    searchStore.setOpen(!searchStore.isOpen);
                    if (!searchStore.isOpen) {
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
                {searchStore.isOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">
                    <div className="p-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="nav-search-input"
                          type="text"
                          placeholder="Search products..."
                          value={searchStore.query}
                          onChange={(e) => {
                            searchStore.setQuery(e.target.value);
                            searchStore.setOpen(true);
                          }}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Results */}
                    {searchStore.query.length >= 2 && (
                      <div className="border-t">
                        {searchStore.results.length > 0 ? (
                          <>
                            {searchStore.results.map((product: any) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                onClick={() => {
                                  searchStore.setOpen(false);
                                  searchStore.setQuery("");
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  {product.images?.[0] && (
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
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
                              href={`/shop?search=${encodeURIComponent(searchStore.query)}`}
                              onClick={() => {
                                searchStore.setOpen(false);
                                searchStore.setQuery("");
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
              <div className="relative">
                {session ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {session.user?.name?.charAt(0) || "U"}
                    </button>

                    {/* Custom Dropdown */}
                    {isUserMenuOpen && (
                      <>
                        {/* Backdrop to capture clicks outside */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsUserMenuOpen(false)}
                        />
                        
                        {/* Dropdown Content */}
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {session.user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {session.user?.email}
                            </p>
                          </div>
                            
                          <div className="py-1">
                            <Link
                              href="/account"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <User className="h-4 w-4 mr-3 text-gray-400" />
                              My Account
                            </Link>
                            <Link
                              href="/account/orders"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <ShoppingBag className="h-4 w-4 mr-3 text-gray-400" />
                              Orders
                            </Link>
                          </div>
                            
                          <div className="border-t py-1">
                            <button
                              onClick={() => {
                              setIsUserMenuOpen(false);
                              signOut();
                              }}
                              className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
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
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className={`relative ${shouldShowDark ? "text-gray-700" : "text-black"}`}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-gray-800 text-white text-xs font-bold"
                  >
                    {totalItems()}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}