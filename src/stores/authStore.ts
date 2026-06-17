import { create } from 'zustand'

interface AuthState {
  token: string | null
  encryptedToken: string | null
  user: { id: string; email: string } | null
  setAuth: (token: string, encryptedToken: string, user: { id: string; email: string }) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  encryptedToken: null,
  user: null,
  setAuth: (token, encryptedToken, user) => set({ token, encryptedToken, user }),
  clearAuth: () => set({ token: null, encryptedToken: null, user: null }),
}))