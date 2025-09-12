import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { Event, Community } from '@/types'

export function useEvents() {
  return useQuery<{ events: Event[] }>({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await api.get('/api/events')
      return res.data
    },
  })
}

export function useCommunities() {
  return useQuery<{ communities: Community[] }>({
    queryKey: ['communities'],
    queryFn: async () => {
      const res = await api.get('/api/communities')
      return res.data
    },
  })
}

