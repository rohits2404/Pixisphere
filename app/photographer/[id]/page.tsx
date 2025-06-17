'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Photographer } from '@/store/usePhotographers'
import Image from 'next/image'
import Link from 'next/link'
import { useModal } from '@/store/useModal'
import InquiryModal from '@/components/InquiryModal'
import { ArrowLeft, Star, Camera, Mail, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PhotographerProfile() {
  const { id } = useParams()
  const [data, setData] = useState<Photographer | null>(null)
  const [loading, setLoading] = useState(true)
  const { open } = useModal()

  useEffect(() => {
    fetch(`https://pixisphere-api-9t20.onrender.com/photographers/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="animate-pulse-slow rounded-full h-16 w-16 bg-gradient-to-r from-blue-400 to-purple-500 opacity-75"></div>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <Card className="text-center p-8 max-w-md border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Photographer Not Found</h2>
        <p className="text-gray-600 mb-6">The photographer you're looking for doesn't exist or may have been removed.</p>
        <Button asChild variant="gradient">
          <Link href="/category">
            <ArrowLeft className="mr-2 h-4 w-4" /> Browse Photographers
          </Link>
        </Button>
      </Card>
    </div>
  )

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <InquiryModal />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 group">
          <Link href="/category">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Photographers
          </Link>
        </Button>

        {/* Profile Header */}
        <Card className="flex flex-col lg:flex-row gap-0 overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          {/* Profile Image */}
          <div className="relative w-full lg:w-1/3 h-80 lg:h-auto">
            <Image
              src={data.profilePic}
              alt={data.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Profile Info */}
          <div className="p-6 lg:p-8 flex-1 bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data.name}
              </h1>
              <Badge variant="outline" className="bg-yellow-50/80 border-yellow-200">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium text-yellow-700">{data.rating}</span>
              </Badge>
            </div>

            <p className="text-gray-700 mb-6">{data.bio}</p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <MapPin className="text-blue-500 mr-2 h-4 w-4" />
                <span className="text-gray-700">{data.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700">₹{data.price.toLocaleString()} onwards</span>
              </div>
              <div className="flex items-center">
                <Camera className="text-blue-500 mr-2 h-4 w-4" />
                <span className="text-gray-700">{data.styles[0]}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {data.styles.map((style) => (
                <Badge key={style} variant="blue" className="animate-fade-in">
                  {style}
                </Badge>
              ))}
              {data.tags.map((tag) => (
                <Badge key={tag} variant="green" className="animate-fade-in">
                  {tag}
                </Badge>
              ))}
            </div>

            <Button 
              onClick={open}
              variant="gradient"
              className="group shadow-lg hover:shadow-xl transition-all"
            >
              <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> 
              Send Inquiry
            </Button>
          </div>
        </Card>

        {/* Gallery Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Camera className="mr-2 text-blue-500 h-5 w-5" /> Gallery
            </h2>
            <p className="text-gray-500">{data.portfolio.length} photos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.portfolio.map((img, i) => (
              <Card 
                key={i} 
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-64 border-0"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          {data.reviews.length > 0 ? (
            <div className="space-y-4">
              {data.reviews.map((rev, i) => (
                <Card 
                  key={i} 
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-0 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{rev.name}</p>
                      <p className="text-sm text-gray-500">{rev.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderRatingStars(rev.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700">{rev.comment}</p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-0 shadow-sm text-center">
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
