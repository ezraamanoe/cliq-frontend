import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useProfile() {
  return useQuery<{ profile: { id: string; name: string; email: string; avatar?: string } }>({
    queryKey: ['profile'],
    queryFn: async () => (await api.get('/api/profile')).data,
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { name: string; email: string; avatar?: string }) =>
      (await api.put('/api/profile', payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  })
}
