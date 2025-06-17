'use client'

import { useFilterStore } from '@/store/FilterStore'
import { useState } from 'react'
import { Camera, MapPin, Star, DollarSign, RefreshCw, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stylesList = ['Traditional', 'Candid', 'Studio', 'Outdoor']
const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad']

type SortBy = 'recent' | 'price-asc' | 'rating-desc';

export default function FilterSidebar() {

    const {
        city,
        priceRange,
        rating,
        styles,
        sortBy,
        setFilters,
        resetFilters,
    } = useFilterStore()

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile filter toggle button */}
            <Button 
            onClick={() => setIsOpen(true)}
            className="sm:hidden fixed bottom-6 right-6 z-20 p-0 rounded-full shadow-2xl hover:shadow-lg transition-all h-14 w-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
                <Camera className="h-6 w-6" />
            </Button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 sm:hidden animate-fade-in"
                onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar - scrollbar removed */}
            <aside className={`
                ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
                fixed sm:sticky top-0 left-0 w-80 sm:w-72
                h-screen sm:h-[calc(100vh-2rem)] sm:top-4
                bg-white/80 backdrop-blur-lg p-6 
                border-r border-gray-200/50 sm:rounded-lg
                shadow-xl sm:shadow-sm z-40
                transition-transform duration-300 ease-out
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]
            `}>
                <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                `}</style>
                
                <Card className="border-0 bg-transparent shadow-none hide-scrollbar">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                            <Camera className="mr-2 h-5 w-5" /> Filters
                        </h3>
                        <Button 
                        onClick={() => setIsOpen(false)}
                        className="sm:hidden"
                        variant="ghost" 
                        size="icon"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="space-y-8">
                        {/* City Filter */}
                        <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-gray-700">
                            <MapPin className="h-4 w-4 text-blue-500" /> City
                        </Label>
                        <Select
                            value={city || undefined}
                            onValueChange={(value) => setFilters({ city: value })}
                        >
                            <SelectTrigger className="w-full border-gray-300 hover:border-blue-300 transition-colors">
                            <SelectValue placeholder="All Cities" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="all">All Cities</SelectItem>
                            {cities.map((c) => (
                                <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>

                        {/* Price Range Filter */}
                        <div className="space-y-4">
                            <Label className="flex items-center gap-2 text-gray-700">
                                Price Range
                                <Badge variant="outline" className="ml-auto">
                                    ₹0 - ₹{priceRange[1].toLocaleString()}
                                </Badge>
                            </Label>
                            <Slider 
                            defaultValue={[priceRange[1]]}
                            max={20000}
                            step={1000}
                            onValueChange={(value) => setFilters({ priceRange: [0, value[0]] })}
                            className="[&_[role=slider]]:transition-all [&_[role=slider]]:duration-300"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>₹0</span>
                                <span>₹20,000</span>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div className="space-y-3">
                            <Label className="flex items-center gap-2 text-gray-700">
                                <Star className="h-4 w-4 text-amber-500" /> Minimum Rating
                            </Label>
                            <Select
                                value={rating.toString()}
                                onValueChange={(value) => setFilters({ rating: parseFloat(value) })}
                            >
                                <SelectTrigger className="w-full border-gray-300 hover:border-amber-300 transition-colors">
                                <SelectValue placeholder="All Ratings" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">All Ratings</SelectItem>
                                    <SelectItem value="4">4+ Stars</SelectItem>
                                    <SelectItem value="3">3+ Stars</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Styles Filter */}
                        <div className="space-y-3">
                            <Label>Photography Styles</Label>
                            <div className="space-y-3">
                                {stylesList.map((style) => (
                                    <div key={style} className="flex items-center space-x-3">
                                        <Checkbox
                                        id={style}
                                        checked={styles.includes(style)}
                                        onCheckedChange={(checked) => {
                                            const updated = checked
                                            ? [...styles, style]
                                            : styles.filter((s) => s !== style)
                                            setFilters({ styles: updated })
                                        }}
                                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 transition-colors"
                                        />
                                        <Label htmlFor={style} className="font-normal cursor-pointer hover:text-purple-600 transition-colors">
                                            {style}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sort By */}
                        <div className="space-y-3">
                            <Label>Sort By</Label>
                            <Select
                                value={sortBy}
                                onValueChange={(value) => setFilters({ sortBy: value as SortBy })}
                            >
                                <SelectTrigger className="w-full border-gray-300 hover:border-blue-300 transition-colors">
                                <SelectValue placeholder="Recently Added" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="recent">Recently Added</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                        <Button 
                        onClick={resetFilters}
                        variant="outline"
                        className="flex-1 border-gray-300 hover:bg-gray-100/70 transition-all"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" /> Reset
                        </Button>
                        <Button 
                        onClick={() => setIsOpen(false)}
                        className="sm:hidden flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                        >
                            Apply Filters
                        </Button>
                        </div>
                    </div>
                </Card>
            </aside>
        </>
    )
}