'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Photographer } from '@/store/usePhotographers'
import { FiCamera, FiMapPin, FiStar, FiArrowRight } from 'react-icons/fi'

const PhotographerCard = ({ p }: { p: Photographer }) => {
    return (
        <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100">
            {/* Image with overlay effect */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                <Image 
                src={p.profilePic} 
                alt={p.name} 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Rating badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
                    <FiStar className="text-yellow-500 mr-1" />
                    <span className="font-semibold text-gray-800">{p.rating}</span>
                </div>
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="font-semibold text-gray-800">₹{p.price}</span>
                </div>
            </div>
            {/* Card Content */}
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{p.name}</h2>
                        <div className="flex items-center text-gray-600 mt-1">
                            <FiMapPin className="mr-1 text-blue-500" size={14} />
                            <span className="text-sm">{p.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FiCamera className="text-blue-500" size={16} />
                    </div>
                </div>
                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((tag, i) => (
                        <span 
                        key={i} 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {/* CTA Button */}
                <Link href={`/photographer/${p.id}`}>
                    <button className="mt-4 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                        <span>View Profile</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
            {/* Hover effect indicator */}
            <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-blue-400/30 rounded-xl transition-all duration-300"></div>
        </div>
    )
}

export default PhotographerCard
