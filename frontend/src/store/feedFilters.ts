import { create } from 'zustand';

interface FeedFiltersState {
  search: string;
  technologies: string[];
  setSearch: (term: string) => void;
  setTechnologies: (tags: string[]) => void;
  clearFilters: () => void;
}

export const useFeedFilters = create<FeedFiltersState>((set) => ({
  search: '',
  technologies: [],
  setSearch: (term) => set({ search: term }),
  setTechnologies: (tags) => set({ technologies: tags }),
  clearFilters: () => set({ search: '', technologies: [] }),
}));
