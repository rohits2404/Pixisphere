'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePhotographers } from '@/store/usePhotographers'
import { useFilterStore } from '@/store/FilterStore'
import PhotographerCard from '@/components/PhotographerCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'
import { TrendingUp, Award, MapPin, ChevronRight, Loader2, SlidersHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

export default function AllPhotographersPage() {
  const { data, loading, fetchPhotographers } = usePhotographers()
  const filters = useFilterStore()
  const [visibleCount, setVisibleCount] = useState(12)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchPhotographers()
    filters.resetFilters()
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

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
      <Card key={idx} className="animate-pulse border-0 w-full">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-48 sm:h-60 md:h-72 rounded-t-lg"></div>
        <div className="p-4 sm:p-6 space-y-3">
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
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 md:py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Photographer
            </span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top-rated professionals for maternity, newborn, and birthday photography across India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 -mt-8 md:-mt-12 relative z-10">
        {/* Smart Suggestions */}
        <div className="mb-6 md:mb-8 animate-fade-in-up">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Suggestions
                  </span>
                </h2>
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 w-fit">
                  AI-Powered
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {smartSuggestions.map((s, i) => (
                  <Button
                    key={i}
                    onClick={() => handleSuggestionClick(s.searchParams)}
                    variant="outline"
                    className="justify-start gap-2 text-left h-auto py-2 px-3 text-xs sm:text-sm hover:bg-gray-50 group whitespace-normal"
                  >
                    <span className="flex-shrink-0">{s.icon}</span>
                    <span className="text-gray-700 text-ellipsis overflow-hidden line-clamp-2">{s.text}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Popular Destinations */}
        <div className="mb-6 md:mb-10 animate-fade-in-up">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCities.map((city) => (
              <Card
                key={city.name}
                onClick={() => router.push(`/category/${city.name.toLowerCase()}`)}
                className="relative group overflow-hidden rounded-xl cursor-pointer h-32 md:h-48 border-0 shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${city.image})` }}
                ></div>
                <div className="relative z-20 h-full flex flex-col justify-end p-3 md:p-4 lg:p-6">
                  <h3 className="text-white font-bold text-sm md:text-lg">{city.name}</h3>
                  <div className="flex items-center text-white/90 text-xs md:text-sm mt-1">
                    <span>Explore studios</span>
                    <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8 animate-fade-in-up">
          <SearchBar />
        </div>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Mobile filter drawer */}
          {isMobile && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="mb-4 w-full flex gap-2">
                  <SlidersHorizontal size={18} />
                  Filter Photographers
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh] overflow-y-auto px-4 pt-4">
                <FilterSidebar />
              </DrawerContent>
            </Drawer>
          )}

          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="lg:w-72 hidden lg:block animate-slide-in-left">
              <FilterSidebar />
            </div>
          )}

          {/* Main Photographer Grid */}
          <div className="flex-1 animate-fade-in" id="photographers-grid">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {filteredData.length} {filteredData.length === 1 ? 'Photographer' : 'Photographers'} Found
              </h2>
            </div>

            {filteredData.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {loading ? renderSkeletonCards() : visiblePhotographers.map((p) => (
                    <PhotographerCard key={p.id} p={p} />
                  ))}
                </div>

                {!loading && visibleCount < filteredData.length && (
                  <div ref={loaderRef} className="mt-8 md:mt-12 flex justify-center">
                    <Button variant="ghost" className="gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <span className="text-blue-600">Loading more photographers...</span>
                    </Button>
                  </div>
                )}

                {!loading && visibleCount >= filteredData.length && filteredData.length > 0 && (
                  <div className="mt-8 md:mt-12 text-center border-t border-gray-200 pt-6 md:pt-8">
                    <p className="text-gray-500">You've reached the end of results</p>
                  </div>
                )}
              </>
            ) : (
              <Card className="text-center p-6 md:p-8 border-0 shadow-sm">
                <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-2">No photographers found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
                <Button onClick={() => filters.resetFilters()} variant="gradient">
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
