'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Photographer } from '@/store/usePhotographers'
import { Camera, MapPin, Star, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const PhotographerCard = ({ p }: { p: Photographer }) => {
    return (
        <div className="group relative h-full">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 backdrop-blur-sm group-hover:border-blue-200/50 group-hover:-translate-y-1 rounded-2xl">
                {/* Image with overlay effect */}
                <CardHeader className="relative p-0 overflow-hidden rounded-t-2xl">
                    <div className="relative h-60 w-full">
                        <Image 
                            src={p.profilePic} 
                            alt={p.name} 
                            fill
                            className="object-cover rounded-t-2xl transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent rounded-t-2xl" />
                        
                        {/* Rating badge */}
                        <div className="absolute top-3 left-3">
                            <Badge className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm border-0">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                                <span className="font-semibold text-gray-800">{p.rating}</span>
                            </Badge>
                        </div>
                        
                        {/* Price badge */}
                        <div className="absolute top-3 right-3">
                            <Badge className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border-0">
                                <span className="font-semibold text-gray-800">₹{p.price}</span>
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-5">
                    <div className="flex justify-between items-start gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 line-clamp-1 tracking-tight">{p.name}</h2>
                            <div className="flex items-center text-gray-600 mt-2">
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                                <span className="text-sm">{p.location}</span>
                            </div>
                        </div>
                        <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                            <AvatarImage src={p.profilePic} alt={p.name} />
                        </Avatar>
                    </div>

                    {/* Tags with gradient */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((tag, i) => (
                            <div 
                                key={i} 
                                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm animate-fade-in"
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="pb-5 px-5">
                    <Button 
                        asChild
                        className="w-full py-6 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 group/button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                    >
                        <Link href={`/photographer/${p.id}`}>
                            <span>View Profile</span>
                            <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PhotographerCard