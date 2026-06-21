import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden"><Navbar /></div>
      {children}
      <div className="print:hidden"><Footer /></div>
    </>
  );
}
