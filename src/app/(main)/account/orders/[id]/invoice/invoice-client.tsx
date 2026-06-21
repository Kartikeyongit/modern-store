"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function InvoicePrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      className="print:hidden bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
    >
      <Printer className="h-4 w-4 mr-2" />
      Print Invoice
    </Button>
  );
}
