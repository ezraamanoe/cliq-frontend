
"use client"

import { useParams } from 'next/navigation'
import { useEvent } from '@/hooks/event-hooks'
import { Loading } from '@/components/components/loading'
import { useState } from 'react'
import { Badge } from '@/components/components/ui/badge'

export default function EventPage() {
  const params = useParams<{ id: string }>()
  const { data: eventData, isLoading } = useEvent(params.id as string)

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>
  
  const event = eventData?.event
  if (!event) return <div className="min-h-screen flex items-center justify-center">Event not found</div>

  // Format date and time
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl p-6 flex flex-col md:flex-row gap-8">
        {/* Left column: Image + track */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <img
            src={event.background}
            alt={event.title}
            className="w-full h-64 md:h-auto object-cover rounded-lg"
          />
          <div className="flex flex-col">
            <p className="text-sm text-zinc-400">Venue</p>
            <p className="font-medium">{event.venue}</p>
          </div>
          <p className="text-xs text-zinc-500">
            DICE protects fans and artists from resellers. Tickets will be securely stored in the app.
          </p>
          <button className="text-left text-sm font-medium text-yellow-300">
            Got a code?
          </button>
        </div>

        {/* Right column: Details */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-semibold">
              {event.title}
            </h1>
            <p className="text-lg font-light text-yellow-300 mt-2">
              {formattedDate}, {formattedTime}
            </p>
            <p className="mt-1 text-zinc-400 flex items-center gap-2">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">{event.category}</Badge> <span>📍 {event.location}</span>
            </p>
          </div>

          {/* Price + Buy Now */}
          <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg">
            <div>
              <p className="text-xl font-semibold">{event.price}</p>
              <p className="text-sm text-zinc-400">
                The price you'll pay. No surprises later.
              </p>
            </div>
            <button className="bg-yellow-300 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors">
              BUY NOW
            </button>
          </div>

          {/* About */}
          <div>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-zinc-300">
              {event.description || 'No description available.'}
            </p>
          </div>

          {/* Extras */}
          <div className="flex flex-col gap-2 text-sm text-zinc-400">
            <p>📅 {eventDate.toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
            <p>⏰ {formattedTime}</p>
            <p>📍 {event.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}