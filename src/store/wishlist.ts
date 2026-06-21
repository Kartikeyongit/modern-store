import { create } from "zustand";

interface WishlistStore {
  items: string[];
  loading: boolean;
  hydrated: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  toggleItem: (productId: string) => Promise<void>;
  isLiked: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()((set, get) => ({
  items: [],
  loading: false,
  hydrated: false,
  error: null,

  hydrate: async () => {
    if (get().hydrated) return;
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/wishlist");
      if (res.ok) {
        const data = await res.json();
        set({ items: data.items, hydrated: true });
      } else if (res.status === 401) {
        set({ hydrated: true });
      } else {
        set({ error: "Failed to load wishlist" });
      }
    } catch {
      set({ error: "Failed to load wishlist" });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId) => {
    const prev = get().items;
    if (prev.includes(productId)) return;
    set((state) => ({ items: [...state.items, productId] }));
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) {
        set({ items: prev });
      }
    } catch {
      set({ items: prev });
    }
  },

  removeItem: async (productId) => {
    const prev = get().items;
    set((state) => ({
      items: state.items.filter((id) => id !== productId),
    }));
    try {
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        set({ items: prev });
      }
    } catch {
      set({ items: prev });
    }
  },

  toggleItem: async (productId) => {
    const { items, addItem, removeItem } = get();
    if (items.includes(productId)) {
      await removeItem(productId);
    } else {
      await addItem(productId);
    }
  },

  isLiked: (productId) => {
    return get().items.includes(productId);
  },
}));
