import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created: string
}

interface ChatState {
  messages: Message[]
  loading: boolean
  error: string | null
  setMessages: (msgs: Message[]) => void
  addMessage: (msg: Message) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
  clearChat: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  loading: false,
  error: null,
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setLoading: (v) => set({ loading: v }),
  setError: (e) => set({ error: e }),
  clearChat: () => set({ messages: [], error: null }),
}))