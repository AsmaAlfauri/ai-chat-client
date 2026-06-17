import { useEffect, useState } from 'react'
import { restoreSession } from './lib/auth'
import { fetchConversations } from './lib/conversations'
import { useAuthStore } from './stores/authStore'
import LoginPage from './components/LoginPage'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'

export default function App() {
  const { token, user } = useAuthStore()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    restoreSession().finally(() => setChecking(false))
  }, [])

  useEffect(() => {
    if (user) fetchConversations(user.id)
  }, [user])

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    )
  }

  if (!token) return <LoginPage />

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <ChatArea />
    </div>
  )
}