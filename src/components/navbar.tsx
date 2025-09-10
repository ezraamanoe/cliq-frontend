"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/components/ui/sheet"
import router from "next/router"
export function Navbar() {
  const { theme, setTheme } = useTheme()
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark")
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const isScrollingUp = prevScrollPos > currentScrollPos
      
      if (currentScrollPos > 100) {
        setIsVisible(isScrollingUp || currentScrollPos < 10)
      } else {
        setIsVisible(true)
      }
      
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header 
      className={`sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4 pb-4 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container h-16 flex items-center justify-between">
        {/* Logo - Always visible */}
        <Link href="/" className="flex items-center">
          <h1 className="text-5xl sm:text-5xl font-bold tracking-wider font-anton">CLIQ</h1>
        </Link>
        
        {/* Desktop Navigation - Right Aligned */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/passes" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      My Passes
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Profile
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button variant="default" onClick={() => router.push('/register')}>
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button variant="default" onClick={() => router.push('/register')}>
                Sign Up
              </Button>
              <SheetTrigger asChild>
                <Menu className="h-10 w-10 cursor-pointer" />
              </SheetTrigger>
            </div>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                <Link 
                  href="/" 
                  className="text-lg hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link href="/passes" className="text-lg hover:underline">
                  My Passes
                </Link>
                <Link href="/profile" className="text-lg hover:underline">
                  Profile
                </Link>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}
