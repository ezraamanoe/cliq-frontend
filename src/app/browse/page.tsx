"use client"

import { CategoryFilter } from '@/components/category-filter'
import { Button } from '@/components/components/ui/button'
import { Input } from '@/components/components/ui/input'
import { Skeleton } from '@/components/components/ui/skeleton'
import { EventCard } from '@/components/event-card'
import { CommunityCard } from '@/components/community-card'
import { Filters } from '@/components/filters'
import { useEvents, useCommunities } from '@/hooks/queries'
import { OctagonAlert, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select'
import { PaginationDemo } from '@/components/pagination-component'

export default function HomePage() {
  const { data: events, isLoading: eventsLoading } = useEvents()
  const { data: communities, isLoading: communitiesLoading } = useCommunities()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [location, setLocation] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['All', 'Tonight', 'This Week', 'Music', 'Technology', 'Environment', 'Food', 'Outdoors', 'Social', 'Business', 'Sports', 'Art', 'Hot']

  const filteredEvents = useMemo(() => {
    let list = events?.events ?? []
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
    
    if (location.trim()) {
      const query = location.toLowerCase()
      list = list.filter((e) => 
        e.location.toLowerCase().includes(query) ||
        (e.venue && e.venue.toLowerCase().includes(query)) ||
        e.title.toLowerCase().includes(query) ||
        e.category.toLowerCase().includes(query)
      )
    }
    return list
  }, [events, selectedCategory, location])
  
  const filteredCommunities = useMemo(() => {
    let list = communities?.communities ?? []
    
    if (selectedCategory !== 'all' && selectedCategory !== 'All' && 
        !['Tonight', 'This Week'].includes(selectedCategory)) {
      list = list.filter((c) => c.category === selectedCategory)
    }
    
    if (location.trim()) {
      const query = location.toLowerCase()
      list = list.filter((c) => 
        c.name.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        (c.description && c.description.toLowerCase().includes(query)) ||
        c.category.toLowerCase().includes(query)
      )
    }
    
    return list
  }, [communities, selectedCategory, location])
  
  const hasResults = filteredEvents.length > 0 || filteredCommunities.length > 0
  const isLoading = eventsLoading || communitiesLoading
  
  return (
    <div className="container py-4 flex flex-col min-h-screen">
      <div className="grid grid-cols-2 gap-2">
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Events or Communities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Events and Communities</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="communities">Communities</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mt-4">
        <Filters 
          filters={["location", "date", "price"]}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="mt-8">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={categories}
        />
      </div>
      <div className="flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[...Array(6)].map((_, i) => (
              <div className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center space-x-2 pt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
              </div>
            ))}
          </div>
        ) : hasResults ? (
          <div className="mt-8">
            {filteredEvents.length > 0 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl">
                  Events <span className="text-muted-foreground">in London</span>
                  {/* Events{location ? ` in ${location}` : ''} */}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEvents.map((event) => (
                    <EventCard key={`event-${event.id}`} event={event} className="w-full" />
                  ))}
                </div>
              </div>
            )}
  
            {filteredCommunities.length > 0 && (
              <div className="flex flex-col gap-4 mt-8">
                <h1 className="text-4xl">
                  Communities <span className="text-muted-foreground">in London</span>
                  {/* Communities{location ? ` in ${location}` : ''} */}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCommunities.map((community) => (
                    <CommunityCard 
                      key={`community-${community.id}`} 
                      community={community} 
                      className="w-full" 
                    />
                  ))}
                </div>
                <div className="mt-8">
                  <PaginationDemo />
                </div>
              </div>
            )}
            
          </div>

        ) : (
          <div className="flex-1 flex pt-20 flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <OctagonAlert strokeWidth={1} className="h-24 w-24 p-0 m-0" />
              <h2 className="mt-4 text-2xl font-semibold">No results found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters or search for something else
              </p>
              <Button 
                className="mt-6" 
                onClick={() => {
                  setSelectedCategory("all")
                  setLocation("")
                }}
              >
                Explore All Communities and Events
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}