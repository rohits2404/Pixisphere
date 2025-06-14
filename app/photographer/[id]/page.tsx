'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Photographer } from '@/store/usePhotographers'
import Image from 'next/image'
import Link from 'next/link'
import { useModal } from '@/store/useModal'
import InquiryModal from '@/components/InquiryModal'
import { FiArrowLeft, FiStar, FiCamera, FiMail, FiMapPin } from 'react-icons/fi'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

export default function PhotographerProfile() {
  const { id } = useParams()
  const [data, setData] = useState<Photographer | null>(null)
  const [loading, setLoading] = useState(true)
  const { open } = useModal()

  useEffect(() => {
    fetch(`https://pixisphere-api-17ip.onrender.com/photographers/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Photographer Not Found</h2>
        <p className="text-gray-600 mb-6">The photographer you're looking for doesn't exist or may have been removed.</p>
        <Link href="/category" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiArrowLeft className="mr-2" /> Browse Photographers
        </Link>
      </div>
    </div>
  )

  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InquiryModal />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/category" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Photographers
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Image */}
          <div className="relative w-full lg:w-1/3 h-64 lg:h-auto">
            <Image
              src={data.profilePic}
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Profile Info */}
          <div className="p-6 lg:p-8 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <FiStar className="text-yellow-500 mr-1" />
                <span className="font-medium text-yellow-700">{data.rating}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{data.bio}</p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <FiMapPin className="text-blue-500 mr-2" />
                <span className="text-gray-700">{data.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700">₹{data.price} onwards</span>
              </div>
              <div className="flex items-center">
                <FiCamera className="text-blue-500 mr-2" />
                <span className="text-gray-700">{data.styles[0]}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {data.styles.map((style) => (
                <span key={style} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {style}
                </span>
              ))}
              {data.tags.map((tag) => (
                <span key={tag} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={open}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              <FiMail className="mr-2" /> Send Inquiry
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiCamera className="mr-2 text-blue-500" /> Gallery
            </h2>
            <p className="text-gray-500">{data.portfolio.length} photos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.portfolio.map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-64">
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          {data.reviews.length > 0 ? (
            <div className="space-y-4">
              {data.reviews.map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{rev.name}</p>
                      <p className="text-sm text-gray-500">{rev.date}</p>
                    </div>
                    <div className="flex items-center">
                      {renderRatingStars(rev.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
