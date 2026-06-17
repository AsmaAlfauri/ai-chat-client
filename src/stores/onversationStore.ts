import { create } from 'zustand'

export interface Conversation {
  id: string
  title: string
  created: string
}

interface ConversationState {
  conversations: Conversation[]
  activeId: string | null
  setConversations: (list: Conversation[]) => void
  addConversation: (c: Conversation) => void
  removeConversation: (id: string) => void
  renameConversation: (id: string, title: string) => void
  setActiveId: (id: string | null) => void
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversations: [],
  activeId: null,
  setConversations: (list) => set({ conversations: list }),
  addConversation: (c) => set((s) => ({ conversations: [c, ...s.conversations] })),
  removeConversation: (id) => set((s) => ({ conversations: s.conversations.filter((c) => c.id !== id) })),
  renameConversation: (id, title) => set((s) => ({
    conversations: s.conversations.map((c) => c.id === id ? { ...c, title } : c),
  })),
  setActiveId: (id) => set({ activeId: id }),
}))