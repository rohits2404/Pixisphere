"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/store/FilterStore";
import { FiSearch, FiX } from "react-icons";

export default function SearchBar() {

    const [input,setInput] = useState('');
    const setFilters = useFilterStore((e) => s.setFilters)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters({ search: input.toLowerCase() })
        }, 300)
        return () => clearTimeout(timeout)
    },[input,setFilters])

    const clearInput = () => {
        setInput('')
        setFilters({ search: '' })
    }

    return(
        <div className="relative w-full max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
                <FiSearch className="absolute left-4 text-gray-400 h-5 w-5"/>
                <input
                className="w-full py-4 pl-12 pr-12 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200 hover:shadow-md"
                type={"text"}
                placeholder="Search Photographers By Name, Location or Tag ..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Search Photographer"
                />
                {input && (
                    <button
                    onClick={clearInput}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Clear Search"
                    >
                        <FiX className="h-5 w-5"/>
                    </button>
                )}  
            </div>
        </div>
    )
}
