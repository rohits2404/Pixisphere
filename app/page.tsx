'use client';

import { useRouter } from "next/navigation";

export default function HomePage() {

    const router = useRouter();

    return(
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Animated Heading With Gradient Text */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold animate-fade-in">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Welcome To Pixisphere
                        </span>
                    </h1>
                    {/* Subtitle With Smooth Transition */}
                    <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-300 hover:text-gray-800">
                        Discover India's finest maternity, newborn, and birthday photographers, 
                        curated to capture your most precious moments perfectly.
                    </p>
                    {/* Primary CTA Button with Hover Effects */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <button
                        onClick={()=>router.push('/category')}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
                        >
                            Browse All Photographers
                        </button>
                        <button
                        onClick={()=>router.push('/about')}
                        className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-300"
                        >
                            Learn More
                        </button>
                    </div>
                    {/* Stats or Featured Cities Section */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'].map((city)=>(
                            <div
                            key={city}
                            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={()=>router.push(`/category/${city.toLowerCase()}`)}
                            >
                                <h3 className="font-semibold text-blue-800">{city}</h3>
                                <p className="text-sm text-gray-600">Top Photographers</p>
                            </div>                    
                        ))}
                    </div>
                </div>
                {/* Floating decorative elements */}
                <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-200 opacity-20 animate-float"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-purple-200 opacity-20 animate-float-delay"></div>
            </div>
        </main>
    )
}
