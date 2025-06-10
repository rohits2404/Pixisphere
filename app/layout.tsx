import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pixisphere",
    description: "Find The Best Photographers Near You.",
    icons: {
        icon: "/icons/logo.png"
    }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return(
        <html lang="en">
            <body className="min-h-screen bg-gray-50 text-gray-900">
                {children}
            </body>
        </html>
    )
}
