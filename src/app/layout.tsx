import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import { Anton } from 'next/font/google'
import FooterSection from "@/components/footer"

const anton = Anton({ 
weight: '400',
  subsets: ['latin'],
  variable: '--font-anton'
})

export const metadata: Metadata = {
  title: "Cliq",
  description: "Discover and join events",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${anton.variable} font-sans`}>
        <Providers>
          <Navbar />
          <main className="container py-4 min-h-screen">{children}</main>
          <FooterSection />
        </Providers>
      </body>
    </html>
  )
}
