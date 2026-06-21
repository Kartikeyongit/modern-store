"use client";

import { useEffect } from "react";
import { useWishlistStore } from "@/store/wishlist";

export function WishlistHydrator() {
  const hydrate = useWishlistStore((s) => s.hydrate);
  const hydrated = useWishlistStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  return null;
}
