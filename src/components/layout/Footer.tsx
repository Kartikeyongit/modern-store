import Link from "next/link";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Sale", href: "/sale" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
              Borrow
            </Link>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed font-light">
              Premium products curated for the modern lifestyle. Quality, design, and innovation — delivered to your doorstep.
            </p>
            <div className="mt-6 flex gap-5">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">X</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">Instagram</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">GitHub</a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs text-white/50 tracking-[0.2em] uppercase mb-5">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs text-white/50 tracking-[0.2em] uppercase mb-5">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs text-white/50 tracking-[0.2em] uppercase mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-500 font-light">
              &copy; 2026 Borrow. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-neutral-500 hover:text-white transition-colors font-light">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-neutral-500 hover:text-white transition-colors font-light">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
