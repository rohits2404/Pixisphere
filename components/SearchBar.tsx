'use client'

import { useEffect, useState } from 'react'
import { useFilterStore } from '@/store/FilterStore'
import { Search, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchBar() {
    
    const [input, setInput] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const setFilters = useFilterStore((s) => s.setFilters)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters({ search: input.toLowerCase() })
        }, 300)

        return () => clearTimeout(timeout)
    }, [input, setFilters])

    const clearInput = () => {
        setInput('')
        setFilters({ search: '' })
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto mb-8 group">
            <div className="relative flex items-center">
                {/* Background gradient (only shows on hover/focus) */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isFocused ? 'opacity-100' : ''}`}></div>
                
                {/* Search icon */}
                <Search className={`absolute left-4 h-5 w-5 transition-all duration-300 ${isFocused ? 'text-purple-500 scale-110' : 'text-gray-400'}`} />
                
                {/* Input field - critical focus styles removed */}
                <Input
                    className="w-full py-6 pl-12 pr-12 rounded-full border-0 bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 placeholder-gray-400 transition-all duration-300 group-hover:shadow-xl focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="text"
                    placeholder="Search photographers by name, location or tag..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-label="Search photographers"
                />
                
                {/* Clear button */}
                {input && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearInput}
                        className={`absolute right-3 rounded-full transition-all duration-300 ${isFocused ? 'text-purple-500 bg-purple-50/50' : 'text-gray-400 hover:bg-gray-100/50'}`}
                        aria-label="Clear search"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Removed the animated underline completely */}
        </div>
    )
}