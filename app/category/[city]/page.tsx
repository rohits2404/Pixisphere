'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePhotographers } from '@/store/usePhotographers'
import { useFilterStore } from '@/store/FilterStore'
import PhotographerCard from '@/components/PhotographerCard'
import { ArrowLeft, Star, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CityCategoryPage() {
    const { city: routeCity } = useParams()
    const { data, loading, fetchPhotographers } = usePhotographers()
    const filters = useFilterStore()
    const [visibleCount, setVisibleCount] = useState(12)
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const [loadingMore, setLoadingMore] = useState(false)
    const router = useRouter()
    const cityName = Array.isArray(routeCity) ? routeCity[0] : routeCity || ''

    useEffect(() => {
        fetchPhotographers()
        filters.resetFilters()
    }, [])

    const filteredData = data
        .filter((p) => p.location.toLowerCase() === cityName.toLowerCase())
        .sort((a, b) => b.id - a.id)

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
            <Card key={idx} className="border-0 animate-pulse">
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

    const suggestion = data.find(
        (p) =>
            p.location.toLowerCase() === cityName.toLowerCase() &&
            p.rating >= 4.5 &&
            p.styles.includes('Outdoor')
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button and City Header */}
                <div className="mb-8">
                    <Button 
                        variant="ghost" 
                        onClick={() => router.push('/category')}
                        className="group mb-4 pl-0"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to All Photographers
                    </Button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold capitalize bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {cityName} Photographers
                            </h1>
                            <p className="text-gray-600 mt-2 animate-fade-in">
                                {filteredData.length} professional photographers available
                            </p>
                        </div>
                    </div>
                </div>

                {/* Smart Suggestion */}
                {suggestion && (
                    <Card className="bg-gradient-to-r from-blue-50/50 to-blue-100/50 border border-blue-200/50 rounded-xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="flex-shrink-0 w-20 h-20 relative rounded-full overflow-hidden border-2 border-white shadow-lg group">
                                <Image
                                    src={suggestion.profilePic}
                                    alt={suggestion.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex-1">
                                <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-700 mb-2">
                                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                                    Top Recommendation
                                </Badge>
                                <p className="text-blue-900">
                                    <strong className="font-semibold">{suggestion.name}</strong> is a top-rated outdoor photographer in{' '}
                                    {suggestion.location} with a {suggestion.rating} rating!
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => router.push(`/photographer/${suggestion.id}`)}
                                className="group border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                                View Profile <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Photographers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading ? renderSkeletonCards() : visiblePhotographers.map((p) => (
                        <PhotographerCard key={p.id} p={p} />
                    ))}
                </div>

                {/* Loading More */}
                {!loading && visibleCount < filteredData.length && (
                    <div ref={loaderRef} className="mt-12 flex justify-center">
                        <Button variant="ghost" className="gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
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

                {/* No Results */}
                {!loading && filteredData.length === 0 && (
                    <Card className="text-center p-8 border-0 shadow-sm mt-8">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No photographers found in {cityName}</h3>
                        <p className="text-gray-600 mb-4">We might have photographers in nearby locations</p>
                        <Button 
                            onClick={() => router.push('/category')}
                            variant="gradient"
                        >
                            Browse All Photographers
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    )
}