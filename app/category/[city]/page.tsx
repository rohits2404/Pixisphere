'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePhotographers } from '@/store/usePhotographers'
import { useFilterStore } from '@/store/FilterStore'
import PhotographerCard from '@/components/PhotographerCard'
import { FiArrowLeft, FiStar, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'

export default function CityCategoryPage() {

    const { city: routeCity } = useParams()
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

    const filteredData = data
        .filter((p) => p.location.toLowerCase() === (routeCity as string).toLowerCase())
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

    const suggestion = data.find(
        (p) =>
            p.location.toLowerCase() === (routeCity as string).toLowerCase() &&
            p.rating >= 4.5 &&
            p.styles.includes('Outdoor')
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button and City Header */}
                <div className="mb-8">
                    <button
                    onClick={() => router.push('/category')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to All Photographers
                    </button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 capitalize">
                                {routeCity} Photographers
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {filteredData.length} professional photographers available
                            </p>
                        </div>
                    </div>
                </div>
                {/* Smart Suggestion */}
                {suggestion && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 mb-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden border-2 border-white shadow">
                                <Image
                                src={suggestion.profilePic}
                                alt={suggestion.name}
                                fill
                                className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-800 mb-1">
                                    <FiStar className="inline mr-1 text-yellow-500" />
                                    Top Recommendation
                                </h3>
                                <p className="text-blue-900">
                                    <strong>{suggestion.name}</strong> is a top-rated outdoor photographer in{' '}
                                    {suggestion.location} with a {suggestion.rating} rating!
                                </p>
                            </div>
                          <button
                          onClick={() => router.push(`/photographer/${suggestion.id}`)}
                          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                          >
                              View Profile <FiChevronRight className="ml-1" />
                          </button>
                        </div>
                    </div>
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
                        <div className="flex items-center justify-center space-x-2 text-blue-600">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
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
                {/* No Results */}
                {!loading && filteredData.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center mt-8">
                      <h3 className="text-xl font-medium text-gray-800 mb-2">No photographers found in {routeCity}</h3>
                      <p className="text-gray-600 mb-4">We might have photographers in nearby locations</p>
                      <button 
                      onClick={() => router.push('/category')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                          Browse All Photographers
                      </button>
                    </div>
                )}
            </div>
        </div>
    )
}
