import { Event } from '@/types'
import { BentoCard } from './magicui/bento-grid'
import { cn } from '@/lib/utils'
import { CSSProperties } from 'react'

export function EventCard({ event, className, style }: { event: Event; className?: string; style?: CSSProperties }) {
  return (
    <BentoCard
      name={event.title}
      date={event.date}
      startTime={event.startTime}
      endTime={event.endTime}
      href={`/events/${event.id}`}
      price={event.price}
      venue={event.venue}
      className={cn('w-[290px] h-[320px]', className)}
      style={style} 
      background={<img src={event.background} alt="" className="h-full w-full object-cover" />}
    />
  )
}