import { create } from "zustand";

interface SearchResult {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface SearchStore {
  query: string;
  isOpen: boolean;
  results: SearchResult[];
  setQuery: (query: string) => void;
  setOpen: (isOpen: boolean) => void;
  setResults: (results: SearchResult[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  isOpen: false,
  results: [],
  setQuery: (query) => set({ query }),
  setOpen: (isOpen) => set({ isOpen }),
  setResults: (results) => set({ results }),
}));
