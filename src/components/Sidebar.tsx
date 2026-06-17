import { useState } from 'react'
import { useConversationStore } from '../stores/conversationStore'
import { useAuthStore } from '../stores/authStore'
import { createConversation, renameConversation, deleteConversation } from '../lib/conversations'
import { logout } from '../lib/auth'
import { useThemeStore } from '../stores/themeStore'

export default function Sidebar() {
  const { dark, toggle } = useThemeStore()
  const { conversations, activeId, setActiveId } = useConversationStore()
  const { user } = useAuthStore()
  const [renaming, setRenaming] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')

  async function handleNew() {
    if (!user) return
    await createConversation(user.id)
  }

  async function handleRename(id: string) {
    if (!renameVal.trim()) return
    await renameConversation(id, renameVal.trim())
    setRenaming(null)
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 dark:bg-gray-950 text-white">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={handleNew}
          className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold hover:bg-blue-700"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 && (
          <p className="mt-4 text-center text-sm text-gray-500">No conversations yet</p>
        )}
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`group mb-1 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm ${
              activeId === c.id ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            {renaming === c.id ? (
              <input
                autoFocus
                className="flex-1 bg-gray-600 rounded px-1 text-white outline-none"
                value={renameVal}
                onChange={(e) => setRenameVal(e.target.value)}
onKeyDown={(e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    handleRename(c.id)
  }
  if (e.key === 'Escape') {
    setRenaming(null)
  }
}}
onBlur={() => {
  if (renameVal.trim()) {
    handleRename(c.id)
  } else {
    setRenaming(null)
  }
}}
              />
            ) : (
              <span className="flex-1 truncate">{c.title}</span>
            )}
            <div className="ml-1 hidden gap-1 group-hover:flex">
              <button
                onClick={(e) => { e.stopPropagation(); setRenaming(c.id); setRenameVal(c.title) }}
                className="text-gray-400 hover:text-white text-xs px-1"
              >✏️</button>
              <button
                onClick={(e) => { e.stopPropagation(); deleteConversation(c.id) }}
                className="text-gray-400 hover:text-red-400 text-xs px-1"
              >🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 flex flex-col gap-2">
        <button
          onClick={toggle}
          className="w-full rounded-lg bg-gray-700 dark:bg-gray-800 py-1 text-sm hover:bg-gray-600"
        >
          {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <p className="truncate text-xs text-gray-500">{user?.email}</p>
        <button
          onClick={logout}
          className="w-full rounded-lg bg-gray-700 dark:bg-gray-800 py-1 text-sm hover:bg-gray-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}