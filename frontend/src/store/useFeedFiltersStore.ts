import { create } from 'zustand';

interface FeedFiltersState {
  searchTerm: string;
  selectedTags: string[];
  setSearchTerm: (term: string) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
}

export const useFeedFiltersStore = create<FeedFiltersState>((set) => ({
  searchTerm: '',
  selectedTags: [],
  
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  
  toggleTag: (tag: string) =>
    set((state) => {
      const isSelected = state.selectedTags.includes(tag);
      return {
        selectedTags: isSelected
          ? state.selectedTags.filter((t) => t !== tag)
          : [...state.selectedTags, tag],
      };
    }),
    
  clearFilters: () => set({ searchTerm: '', selectedTags: [] }),
}));
