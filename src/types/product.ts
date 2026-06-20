export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  category: string;
  rating: number | null;
  reviewCount: number | null;
  stock: number;
  isNew?: boolean;
  isSale?: boolean;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  details?: { label: string; value: string }[];
}