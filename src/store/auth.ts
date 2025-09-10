import { create } from 'zustand'

interface AuthState {
  token: string | null
  user: { id: string; name: string; email: string; avatar?: string } | null
  setToken: (t: string | null) => void
  setUser: (u: AuthState['user']) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (t) => set({ token: t }),
  setUser: (u) => set({ user: u }),
  logout: () => set({ token: null, user: null }),
}))
