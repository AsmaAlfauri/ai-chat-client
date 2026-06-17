import { pb } from './pb'
import { useChatStore } from '../stores/chatStore'

export async function fetchMessages(conversationId: string) {
  const result = await pb.collection('messages').getFullList({
    filter: `conversation = "${conversationId}"`,
    sort: 'created',
  })
  const msgs = result.map((r) => ({
    id: r.id,
    role: r.role as 'user' | 'assistant',
    content: r.content,
    created: r.created,
  }))
  useChatStore.getState().setMessages(msgs)
  return msgs
}

export async function sendMessage(conversationId: string, content: string) {
  const { addMessage, setLoading, setError } = useChatStore.getState()

  // save user message
  const userRecord = await pb.collection('messages').create({
    conversation: conversationId,
    role: 'user',
    content,
  })
  addMessage({ id: userRecord.id, role: 'user', content, created: userRecord.created })

  // call mock AI
  setLoading(true)
  setError(null)
  try {
    const res = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content }),
    })
    if (!res.ok) throw new Error('AI server error')
    const data = await res.json()

    // save assistant message
    const aiRecord = await pb.collection('messages').create({
      conversation: conversationId,
      role: 'assistant',
      content: data.reply,
    })
    addMessage({ id: aiRecord.id, role: 'assistant', content: data.reply, created: aiRecord.created })
  } catch (e: any) {
    setError(e.message || 'Something went wrong')
  } finally {
    setLoading(false)
  }
}