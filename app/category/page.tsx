'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePhotographers } from '@/store/usePhotographers'
import { useFilterStore } from '@/store/FilterStore'
import PhotographerCard from '@/components/PhotographerCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'
import { FiChevronRight, FiLoader } from 'react-icons/fi'

export default function AllPhotographersPage() {
  
    const { data, loading, fetchPhotographers } = usePhotographers()
    const filters = useFilterStore()
    const [visibleCount, setVisibleCount] = useState(12)
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const [loadingMore, setLoadingMore] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetchPhotographers()
        filters.resetFilters()
    }, [])

    const filteredData = data.filter((p) => {
        const keyword = filters.search
        const matchesSearch =
            !keyword ||
            p.name.toLowerCase().includes(keyword) ||
            p.location.toLowerCase().includes(keyword) ||
            p.tags.some((t) => t.toLowerCase().includes(keyword))

        return (
            matchesSearch &&
            (!filters.city || p.location.toLowerCase() === filters.city.toLowerCase()) &&
            p.price >= filters.priceRange[0] &&
            p.price <= filters.priceRange[1] &&
            p.rating >= filters.rating &&
            (filters.styles.length === 0 || filters.styles.some((s) => p.styles.includes(s)))
        )
    })
    .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price
        if (filters.sortBy === 'rating-desc') return b.rating - a.rating
        return b.id - a.id
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry.isIntersecting && !loadingMore && visibleCount < filteredData.length) {
                    setLoadingMore(true)
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + 6)
                        setLoadingMore(false)
                    }, 800)
                }
            },
            { rootMargin: '200px', threshold: 0.1 }
        )
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current)
        }
    }, [loadingMore, visibleCount, filteredData.length])

    const visiblePhotographers = filteredData.slice(0, visibleCount)

    const renderSkeletonCards = () => {
        return Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-60 rounded-lg animate-pulse"></div>
                <div className="mt-4 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                    <div className="flex gap-2 mt-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-6 bg-gray-100 rounded-full w-16 animate-pulse"></div>
                        ))}
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full mt-4 animate-pulse"></div>
                </div>
            </div>
        ))
    }

    const featuredCities = [
        { name: 'Bengaluru', image: '/city/banglore.jpg' },
        { name: 'Mumbai', image: '/city/mumbai.png' },
        { name: 'Delhi', image: '/city/delhi.jpg' },
        { name: 'Hyderabad', image: '/city/hyderabad.jpg' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Perfect Photographer</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover top-rated professionals for maternity, newborn, and birthday photography across India
                        </p>
                    </div>
                    {/* City Quick Links */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {featuredCities.map((city) => (
                                <div 
                                key={city.name} 
                                onClick={() => router.push(`/category/${city.name.toLowerCase()}`)}
                                className="relative group overflow-hidden rounded-xl cursor-pointer h-40"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                      style={{ backgroundImage: `url(${city.image})` }}>
                                    </div>
                                    <div className="relative z-20 h-full flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold text-lg">{city.name}</h3>
                                        <div className="flex items-center text-white/90 text-sm">
                                            <span>Explore studios</span>
                                            <FiChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Search and Filters */}
                    <div className="mb-8">
                        <SearchBar />
                    </div>
                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Hidden on mobile unless toggled (handled in FilterSidebar) */}
                        <div className="lg:w-72 shrink-0">
                            <FilterSidebar />
                        </div>
                        {/* Photographers Grid */}
                        <div className="flex-1">
                            {/* Results Count */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {filteredData.length} {filteredData.length === 1 ? 'Photographer' : 'Photographers'} Found
                                </h2>
                                {/* Sort dropdown could go here */}
                            </div>
                            {/* Photographers Grid */}
                            {filteredData.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {loading ? renderSkeletonCards() : visiblePhotographers.map((p) => (
                                            <PhotographerCard key={p.id} p={p} />
                                        ))}
                                    </div>
                                    {/* Loading More */}
                                    {!loading && visibleCount < filteredData.length && (
                                        <div ref={loaderRef} className="mt-12 flex justify-center">
                                            <div className="flex items-center justify-center space-x-2 text-blue-600">
                                                <FiLoader className="animate-spin h-5 w-5" />
                                                <span>Loading more photographers...</span>
                                            </div>
                                        </div>
                                    )}
                                    {/* End of Results */}
                                    {!loading && visibleCount >= filteredData.length && filteredData.length > 0 && (
                                        <div className="mt-12 text-center">
                                            <p className="text-gray-500 border-t border-gray-200 pt-6">
                                              You've reached the end of results
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">No photographers found</h3>
                                    <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
                                    <button 
                                    onClick={() => filters.resetFilters()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
}
