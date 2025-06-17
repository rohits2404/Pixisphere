'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function HomePage() {
    
    const router = useRouter()

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden relative">
            {/* Floating decorative elements (CSS animations) */}
            <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-200 opacity-20 animate-float-slow" />
            <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-purple-200 opacity-20 animate-float-delay" />
            
            {/* Animated background bubbles */}
            {[...Array(8)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full bg-blue-100 opacity-10 animate-float-random"
                    style={{
                        width: `${Math.random() * 100 + 50}px`,
                        height: `${Math.random() * 100 + 50}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 20 + 10}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated heading with gradient text */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-down">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Welcome to <span className="text-amber-500">Pixisphere</span>
                        </span>
                    </h1>

                    {/* Subtitle with smooth transition */}
                    <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-500 hover:text-gray-900 hover:scale-105">
                        Discover India's finest maternity, newborn, and birthday photographers, 
                        curated to capture your most precious moments perfectly.
                    </p>

                    {/* Primary CTA buttons with hover effects */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-fade-in-up">
                        <Button 
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                            onClick={() => router.push('/category')}
                        >
                            Browse Photographers
                            <span className="ml-2 animate-pulse">👑</span>
                        </Button>
                        <Button 
                            size="lg"
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50/80 hover:text-blue-700 transition-all duration-300"
                            onClick={() => router.push('/about')}
                        >
                            Learn More
                            <span className="ml-2">✨</span>
                        </Button>
                    </div>

                    {/* Featured cities section with cards */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'].map((city) => (
                            <div 
                                key={city}
                                className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-200"
                                onClick={() => router.push(`/category/${city.toLowerCase()}`)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <CardHeader className="relative z-10">
                                    <CardTitle className="text-blue-800 group-hover:text-purple-800 transition-colors duration-300">{city}</CardTitle>
                                    <CardDescription className="text-gray-600">Top photographers</CardDescription>
                                    <div className="mt-3 h-1 w-10 bg-blue-500 mx-auto group-hover:bg-purple-500 transition-colors duration-300" />
                                </CardHeader>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial section with glassmorphism effect */}
                    <div className="mt-20 bg-white/50 backdrop-blur-lg p-8 rounded-2xl border border-white/70 shadow-lg hover:shadow-xl transition-shadow duration-500 max-w-3xl mx-auto">
                        <div className="text-6xl text-blue-400/30 absolute top-2 left-4">"</div>
                        <blockquote className="text-lg sm:text-xl text-gray-800 italic relative z-10 px-4">
                            Pixisphere helped me find the perfect photographer for my baby's first birthday. The quality was exceptional and the experience was seamless!
                        </blockquote>
                        <div className="mt-6 text-right font-medium text-blue-700">
                            <span className="bg-blue-100/70 px-3 py-1 rounded-full text-sm">Priya M., Mumbai</span>
                        </div>
                        <div className="absolute bottom-2 right-4 text-6xl text-blue-400/30 rotate-180">"</div>
                    </div>

                    {/* Floating photo showcase (mock) */}
                    <div className="mt-16 relative h-40">
                        <div className="absolute left-1/4 w-24 h-24 rounded-lg shadow-xl bg-gradient-to-br from-amber-100 to-rose-100 animate-float-slow rotate-6" />
                        <div className="absolute left-1/2 w-28 h-28 rounded-lg shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 animate-float-delay -rotate-6" />
                        <div className="absolute left-3/4 w-20 h-20 rounded-lg shadow-lg bg-gradient-to-br from-green-100 to-cyan-100 animate-float-random rotate-3" />
                    </div>
                </div>
            </div>
        </main>
    )
}