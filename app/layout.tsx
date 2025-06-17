import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: 'Pixisphere',
    description: 'Find the best photographers near you',
    icons: {
        icon: "/icons/logo.png"
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Smooth scrolling */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              scroll-behavior: smooth;
            }
          `
        }} />
      </head>
      <body className={`
        antialiased 
        bg-gradient-to-br from-blue-50 via-white to-blue-100
        text-gray-900
        min-h-screen
        font-sans
      `}>
        {children}
      </body>
    </html>
  );
}