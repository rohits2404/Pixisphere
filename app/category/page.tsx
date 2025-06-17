'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePhotographers } from '@/store/usePhotographers'
import { useFilterStore } from '@/store/FilterStore'
import PhotographerCard from '@/components/PhotographerCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'
import { TrendingUp, Award, MapPin, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

  // AI-powered smart suggestions
  const smartSuggestions = [
    {
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      text: "Top-rated outdoor maternity photographers in Bengaluru",
      searchParams: {
        city: 'bengaluru',
        styles: ['maternity'],
        tags: ['outdoor'],
        sortBy: 'rating-desc'
      }
    },
    {
      icon: <Award className="h-5 w-5 text-purple-500" />,
      text: "Award-winning wedding photographers under ₹50,000",
      searchParams: {
        styles: ['wedding'],
        priceRange: [0, 50000],
        rating: 4.5
      }
    },
    {
      icon: <MapPin className="h-5 w-5 text-green-500" />,
      text: "Best newborn photographers near you",
      searchParams: {
        styles: ['newborn'],
        sortBy: 'rating-desc'
      }
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
      text: "Trending candid photographers in Mumbai",
      searchParams: {
        city: 'mumbai',
        styles: ['candid'],
        sortBy: 'rating-desc'
      }
    }
  ]

  const handleSuggestionClick = (params: any) => {
    filters.setFilters({
      ...filters,
      ...params,
      search: ''
    })
    // Smooth scroll to results
    document.getElementById('photographers-grid')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const filteredData = data
    .filter((p) => {
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
      <Card key={idx} className="animate-pulse border-0">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-60 rounded-t-lg"></div>
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          <div className="flex gap-2 mt-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-100 rounded-full w-16"></div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
        </div>
      </Card>
    ))
  }

  const featuredCities = [
    { name: 'Bengaluru', image: '/city/banglore.jpg' },
    { name: 'Mumbai', image: '/city/mumbai.png' },
    { name: 'Delhi', image: '/city/delhi.jpg' },
    { name: 'Hyderabad', image: '/city/hyderabad.jpg' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Photographer
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top-rated professionals for maternity, newborn, and birthday photography across India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-12 relative z-10">
        {/* AI Smart Suggestions */}
        <div className="mb-8 animate-fade-in-up">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/90 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Suggestions
                  </span>
                </h2>
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  AI-Powered
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {smartSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.searchParams)}
                    variant="outline"
                    className="justify-start gap-3 text-left h-auto py-3 px-4 hover:bg-gray-50/50 transition-all group"
                  >
                    <span className="flex-shrink-0">
                      {suggestion.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {suggestion.text}
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* City Quick Links */}
        <div className="mb-10 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCities.map((city) => (
              <Card 
                key={city.name}
                onClick={() => router.push(`/category/${city.name.toLowerCase()}`)}
                className="relative group overflow-hidden rounded-xl cursor-pointer h-48 border-0 shadow-sm hover:shadow-md transition-all animate-scale-in"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${city.image})` }}
                ></div>
                <div className="relative z-20 h-full flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg">{city.name}</h3>
                  <div className="flex items-center text-white/90 text-sm mt-1">
                    <span>Explore studios</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-fade-in-up">
          <SearchBar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0 animate-slide-in-left">
            <FilterSidebar />
          </div>
          
          {/* Photographers Grid */}
          <div className="flex-1 animate-fade-in" id="photographers-grid">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredData.length} {filteredData.length === 1 ? 'Photographer' : 'Photographers'} Found
              </h2>
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
                    <Button variant="ghost" className="gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <span className="text-blue-600">Loading more photographers...</span>
                    </Button>
                  </div>
                )}

                {/* End of Results */}
                {!loading && visibleCount >= filteredData.length && filteredData.length > 0 && (
                  <div className="mt-12 text-center border-t border-gray-200 pt-8">
                    <p className="text-gray-500">
                      You've reached the end of results
                    </p>
                  </div>
                )}
              </>
            ) : (
              <Card className="text-center p-8 border-0 shadow-sm">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No photographers found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
                <Button
                  onClick={() => filters.resetFilters()}
                  variant="gradient"
                >
                  Reset Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}