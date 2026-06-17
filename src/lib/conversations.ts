import { pb } from './pb'
import { useConversationStore } from '../stores/conversationStore'
import { useChatStore } from '../stores/chatStore'

export async function fetchConversations(userId: string) {
  const result = await pb.collection('conversations').getFullList({
    filter: `user = "${userId}"`,
    sort: '-created',
  })
  const list = result.map((r) => ({ id: r.id, title: r.title, created: r.created }))
  useConversationStore.getState().setConversations(list)
  return list
}

export async function createConversation(userId: string, title = 'New Chat') {
  const record = await pb.collection('conversations').create({ user: userId, title })
  const conv = { id: record.id, title: record.title, created: record.created }
  useConversationStore.getState().addConversation(conv)
  useConversationStore.getState().setActiveId(conv.id)
  useChatStore.getState().clearChat()
  return conv
}

export async function renameConversation(id: string, title: string) {
  await pb.collection('conversations').update(id, { title })
  useConversationStore.getState().renameConversation(id, title)
}

export async function deleteConversation(id: string) {
  await pb.collection('conversations').delete(id)
  useConversationStore.getState().removeConversation(id)
  useConversationStore.getState().setActiveId(null)
  useChatStore.getState().clearChat()
}