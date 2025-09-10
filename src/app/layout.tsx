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
  description: "Discover events around you",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable} font-sans`}>
        <Providers>
          <Navbar />
          <main className="container py-4">{children}</main>
          <FooterSection />
        </Providers>
      </body>
    </html>
  )
}
