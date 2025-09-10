export interface Event {
  id: string
  title: string
  description?: string
  date: string
  startTime: string
  endTime: string
  location: string
  venue: string
  category: string
  price: string
  background: string
  capacity?: number
  availableTickets?: number
}

export type Pass = {
  id: string
  eventId: string
  eventTitle: string
  startTime: string
  status: 'reserved' | 'cancelled'
  qr: string
}
