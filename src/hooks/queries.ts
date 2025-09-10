import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { Event } from '@/types'

export function useEvents() {
  return useQuery<{ events: Event[] }>({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await api.get('/api/events')
      return res.data
    },
  })
}
