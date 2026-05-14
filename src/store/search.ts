import { create } from "zustand";

interface SearchStore {
  query: string;
  isOpen: boolean;
  results: any[];
  setQuery: (query: string) => void;
  setOpen: (isOpen: boolean) => void;
  setResults: (results: any[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  isOpen: false,
  results: [],
  setQuery: (query) => set({ query }),
  setOpen: (isOpen) => set({ isOpen }),
  setResults: (results) => set({ results }),
}));