import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WishlistHydrator } from "@/components/wishlist/WishlistHydrator";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WishlistHydrator />
      <div className="print:hidden"><Navbar /></div>
      {children}
      <div className="print:hidden"><Footer /></div>
    </>
  );
}
