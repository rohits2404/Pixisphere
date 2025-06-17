import { create } from 'zustand'

type SortBy = 'price-asc' | 'rating-desc' | 'recent'

interface FilterState {
    city: string
    priceRange: [number, number]
    rating: number
    styles: string[]
    sortBy: SortBy
    search: string
    setFilters: (filters: Partial<FilterState>) => void
    resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
    city: '',
    priceRange: [0, 20000],
    rating: 0,
    styles: [],
    sortBy: 'recent',
    search: '',
    setFilters: (filters) => set((state) => ({ ...state, ...filters })),
    resetFilters: () =>
        set({
            city: '',
            priceRange: [0, 20000],
            rating: 0,
            styles: [],
            sortBy: 'recent',
            search: '',
        }),
}))