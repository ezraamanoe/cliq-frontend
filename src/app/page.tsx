"use client"

import { useEvents } from '@/hooks/queries'
import { EventCard } from '@/components/event-card'
import { Input } from '@/components/components/ui/input'
import { Skeleton } from '@/components/components/ui/skeleton'
import { CategoryFilter } from '@/components/category-filter'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Filters } from '@/components/filters'

export default function HomePage() {
  const { data, isLoading } = useEvents()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [location, setLocation] = useState<string>('')

  const categories = ['All', 'Tonight', 'This Week', 'Music', 'Social', 'Business', 'Sports', 'Art', 'Hot']

  const filtered = useMemo(() => {
    let list = data?.events ?? []
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    if (selectedCategory === 'Tonight') {
      list = list.filter(e => {
        const eventDate = new Date(e.date)
        return eventDate >= today && eventDate < tomorrow
      })
    } else if (selectedCategory === 'This Week') {
      list = list.filter(e => {
        const eventDate = new Date(e.date)
        return eventDate >= today && eventDate < nextWeek
      })
    } else if (selectedCategory !== 'all' && selectedCategory !== 'All') {
      list = list.filter((e) => e.category === selectedCategory)
    }
    
    if (location.trim()) list = list.filter((e) => 
      e.location.toLowerCase().includes(location.toLowerCase()) ||
      (e.venue && e.venue.toLowerCase().includes(location.toLowerCase())) ||
      e.title.toLowerCase().includes(location.toLowerCase()) ||
      e.category.toLowerCase().includes(location.toLowerCase())
    )
    return list
  }, [data, selectedCategory, location])

  return (
    <div className="flex flex-col">

      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by event, venue or category" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mt-4">
        <Filters selectedCategory={selectedCategory} />
      </div>

      <div className="mt-8">
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />
      </div>

      {/* <div className="flex items-center justify-between">
        <h1 className="text-4xl">Popular Events in {location}</h1>
      </div> */}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Mobile: 2 items, Tablet: 4 items, Desktop: 6 items */}
          {[...Array(2)].map((_, i) => (
            <div key={`mobile-${i}`} className="space-y-3 sm:hidden">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
          {/* Tablet only */}
          {[...Array(4)].map((_, i) => (
            <div key={`tablet-${i}`} className="hidden sm:block lg:hidden space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
          {/* Desktop only */}
          {[...Array(6)].map((_, i) => (
            <div key={`desktop-${i}`} className="hidden lg:block space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {filtered.map((e) => (
                <EventCard key={e.id} event={e} className="w-full" />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No events match your filters.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
