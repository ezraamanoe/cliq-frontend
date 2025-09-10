import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { Event, Pass } from '@/types'

export function useEvent(id: string) {
  return useQuery<{ event: Event }>({
    queryKey: ['event', id],
    queryFn: async () => (await api.get(`/api/events/${id}`)).data,
    enabled: !!id,
  })
}

export function useMyPasses() {
  return useQuery<{ passes: Pass[] }>({
    queryKey: ['passes'],
    queryFn: async () => (await api.get('/api/passes')).data,
  })
}

export function useReservePass() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { eventId: string; eventTitle: string; startTime: string }) => {
      const response = await api.post('/api/passes', {
        eventId: payload.eventId,
        eventTitle: payload.eventTitle,
        startTime: payload.startTime,
        status: 'reserved',
        qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`event:${payload.eventId}`)}`
      })
      return { pass: response.data as Pass }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['passes'] })
    },
  })
}

export function useCancelPass() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/api/passes?id=${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['passes'] }),
  })
}
