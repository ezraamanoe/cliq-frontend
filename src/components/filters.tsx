"use client"

import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import {Button} from "./components/ui/button"
import {BadgePoundSterlingIcon, MapPinIcon, CalendarIcon, ArrowRight} from "lucide-react"
import {Slider} from "./components/ui/slider"
import {Calendar} from "./components/ui/calendar"
import * as React from "react"
import Calendar04 from "./components/calendar-04"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/components/ui/command"

interface FiltersProps {
  selectedCategory?: string;
}

export function Filters({ selectedCategory }: FiltersProps) {
  const [dropdown, setDropdown] =
  React.useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
    "dropdown"
  )

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

  const [range, setRange] = React.useState<[number, number]>([0, 100])
  const [open, setOpen] = React.useState(false)

  const [cities, setCities] = useState<any[]>([])

  async function fetchCities(query: string) {
    if (!query) return setCities([])
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
    )
    const data = await res.json()
    setCities(data)
  }


  return (
    <div className="flex items-center gap-2">

      {/* Location Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" className="flex items-center gap-2"><MapPinIcon />Location</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Command>
            <CommandInput
              placeholder="Search city..."
              onValueChange={(q) => fetchCities(q)}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {cities.map((city) => (
                <CommandItem key={city.place_id} value={city.display_name}>
                  {city.display_name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>


      {/* Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {selectedCategory === 'Tonight' ? 'Tonight' :
             selectedCategory === 'This Week' ? 'This Week' :
             selectedCategory === 'This Month' ? 'This Month' :
             dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, yyyy')}
                </>
              ) : (
                format(dateRange.from, 'MMM d, yyyy')
              )
            ) : 'Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar04 
            dateRange={dateRange || { from: undefined, to: undefined }}
            onSelect={(range) => {
              // Clear time-based category when custom date range is selected
              if (range?.from || range?.to) {
                setDateRange(range);
              }
            }} 
          />
        </PopoverContent>
      </Popover>

      {/* Price Filter */}
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <BadgePoundSterlingIcon className="h-4 w-4" />
            {range[0] === 0 && range[1] === 100 ? 'Price' : <><span>£{range[0]}</span><span><ArrowRight className="h-5 w-5" /></span><span>{range[1] === 100 ? "ANY AMOUNT" : `£${range[1]}`}</span></>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex flex-col items-center gap-4">
            <Slider 
              minStepsBetweenThumbs={1}
              value={range}
              onValueChange={(value) => setRange(value as [number, number])}
              min={0}
              max={100}
              step={5}
            />
            <h3 className="text-white">
              <span className="inline-flex items-center gap-2">
                <span>£{range[0]}</span>
                <ArrowRight className="h-5 w-5" />
                <span>{range[1] === 100 ? "ANY AMOUNT" : `£${range[1]}`}</span>
              </span>
            </h3>
          </div>
        </PopoverContent>
      </Popover>
    </div>      
  )
}
