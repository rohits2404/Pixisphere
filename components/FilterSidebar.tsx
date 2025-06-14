'use client'

import { useFilterStore } from "@/store/FilterStore"
import { useState } from "react"
import { FiFilter, FiX, FiStar, FiDollarSign, FiMapPin, FiRefreshCw } from 'react-icons/fi'

const stylesList = ['Traditional', 'Candid', 'Studio', 'Outdoor']

const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad']

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

    // For mobile responsive toggle
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile filter toggle button */}
            <button 
            onClick={() => setIsOpen(true)}
            className="sm:hidden fixed bottom-6 right-6 z-20 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
            >
                <FiFilter className="h-6 w-6" />
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
                onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
            ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
            fixed sm:sticky top-0 left-0 w-72 h-screen sm:h-auto sm:w-64
            bg-white p-6 shadow-xl sm:shadow-md z-40
            transition-transform duration-300 ease-in-out
            overflow-y-auto
            `}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <FiFilter className="mr-2" /> Filters
                    </h3>
                    <button 
                    onClick={() => setIsOpen(false)}
                    className="sm:hidden text-gray-500 hover:text-gray-700"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-6">
                    {/* City Filter */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <FiMapPin className="filter-icon" /> City
                        </label>
                        <select
                        className="filter-select"
                        value={city}
                        onChange={(e) => setFilters({ city: e.target.value })}
                        >
                            <option value="">All Cities</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    {/* Price Range Filter */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <FiDollarSign className="filter-icon" /> Price Range
                        </label>
                        <div className="px-2">
                            <input
                            type="range"
                            min={0}
                            max={20000}
                            step={1000}
                            value={priceRange[1]}
                            onChange={(e) =>
                                setFilters({ priceRange: [0, parseInt(e.target.value)] })
                            }
                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                                <span>₹0</span>
                                <span>₹{priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    {/* Rating Filter */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <FiStar className="filter-icon" /> Minimum Rating
                        </label>
                        <select
                        className="filter-select"
                        value={rating}
                        onChange={(e) => setFilters({ rating: parseFloat(e.target.value) })}
                        >
                            <option value="0">All Ratings</option>
                            <option value="4">4+ Stars</option>
                            <option value="3">3+ Stars</option>
                        </select>
                    </div>
                    {/* Styles Filter */}
                    <div className="filter-group">
                        <label className="filter-label">Photography Styles</label>
                        <div className="space-y-2">
                            {stylesList.map((style) => (
                                <label key={style} className="filter-checkbox">
                                    <input
                                    type="checkbox"
                                    checked={styles.includes(style)}
                                    onChange={() => {
                                        const updated = styles.includes(style)
                                          ? styles.filter((s) => s !== style)
                                          : [...styles, style]
                                        setFilters({ styles: updated })
                                    }}
                                    className="filter-checkbox-input"
                                    />
                                    <span className="filter-checkbox-label">{style}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Sort By */}
                    <div className="filter-group">
                        <label className="filter-label">Sort By</label>
                        <select
                        className="filter-select"
                        value={sortBy}
                        onChange={(e) => setFilters({ sortBy: e.target.value as any })}
                        >
                            <option value="recent">Recently Added</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="rating-desc">Rating: High to Low</option>
                        </select>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-2">
                        <button 
                        onClick={resetFilters}
                        className="filter-reset-btn"
                        >
                            <FiRefreshCw className="mr-2" /> Reset
                        </button>
                        <button 
                        onClick={() => setIsOpen(false)}
                        className="filter-apply-btn sm:hidden"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
