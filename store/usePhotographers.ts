import { create } from 'zustand'
import axios from 'axios'

export interface Photographer {
    id: number
    name: string
    location: string
    price: number
    rating: number
    styles: string[]
    tags: string[]
    bio: string
    profilePic: string
    portfolio: string[]
    reviews: {
        name: string
        rating: number
        comment: string
        date: string
    }[]
}

interface PhotographerStore {
    data: Photographer[]
    loading: boolean
    error: string | null
    fetchPhotographers: () => Promise<void>
}

export const usePhotographers = create<PhotographerStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    fetchPhotographers: async () => {
        try {
            set({ loading: true })
            const res = await axios.get(`https://pixisphere-api-9t20.onrender.com/photographers`)
            set({ data: res.data, loading: false })
        } catch (e) {
            set({ error: 'Failed to fetch photographers', loading: false })
        }
    },
}))
