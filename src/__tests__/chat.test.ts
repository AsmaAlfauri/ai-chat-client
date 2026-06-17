import { describe, it, expect, beforeEach } from 'vitest'
import { useChatStore } from '../stores/chatStore'

describe('chatStore', () => {
  beforeEach(() => {
    useChatStore.getState().clearChat()
  })

  it('adds a message', () => {
    const msg = { id: '1', role: 'user' as const, content: 'Hello', created: '' }
    useChatStore.getState().addMessage(msg)
    expect(useChatStore.getState().messages).toHaveLength(1)
    expect(useChatStore.getState().messages[0].content).toBe('Hello')
  })

  it('sets loading state', () => {
    useChatStore.getState().setLoading(true)
    expect(useChatStore.getState().loading).toBe(true)
  })

  it('sets error state', () => {
    useChatStore.getState().setError('Something went wrong')
    expect(useChatStore.getState().error).toBe('Something went wrong')
  })

  it('clears chat', () => {
    useChatStore.getState().addMessage({ id: '1', role: 'user', content: 'Hi', created: '' })
    useChatStore.getState().setError('err')
    useChatStore.getState().clearChat()
    expect(useChatStore.getState().messages).toHaveLength(0)
    expect(useChatStore.getState().error).toBeNull()
  })
})