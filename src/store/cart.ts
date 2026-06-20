import { create } from "zustand";
import { Product } from "@/types/product";

function itemKey(productId: string, color?: string, size?: string) {
  return `${productId}::${color || ""}::${size || ""}`;
}

export interface CartItem {
  key: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color?: string, size?: string, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, color, size, qty = 1) => {
    const key = itemKey(product.id, color, size);
    const available = product.stock ?? 99;
    set((state) => {
      const existingItem = state.items.find((item) => item.key === key);
      const currentQty = existingItem ? existingItem.quantity : 0;
      const newQty = Math.min(currentQty + qty, available);
      if (newQty <= currentQty) return state;
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.key === key
              ? { ...item, quantity: newQty }
              : item
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { key, product, quantity: newQty, selectedColor: color, selectedSize: size }],
        isOpen: true,
      };
    });
  },

  removeItem: (key) => {
    set((state) => ({
      items: state.items.filter((item) => item.key !== key),
    }));
  },

  updateQuantity: (key, quantity) => {
    if (quantity <= 0) {
      get().removeItem(key);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.key === key ? { ...item, quantity } : item
      ),
    }));
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  subtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));