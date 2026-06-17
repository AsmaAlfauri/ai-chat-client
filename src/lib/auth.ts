import { pb } from './pb'
import { useAuthStore } from '../stores/authStore'

export async function login(email: string, password: string) {
  const authData = await pb.collection('users').authWithPassword(email, password)
  const token = authData.token
  const user = { id: authData.record.id, email: authData.record.email }

  // encrypt token via Electron safeStorage
  const encrypted = await (window as any).electronAPI.storeToken(token)

  // save encrypted token to localStorage (not plaintext token!)
  localStorage.setItem('enc_token', encrypted)

  useAuthStore.getState().setAuth(token, encrypted, user)
  return user
}

export async function restoreSession() {
  const encrypted = localStorage.getItem('enc_token')
  if (!encrypted) return false

  try {
    const token = await (window as any).electronAPI.loadToken(encrypted)
    if (!token) return false

    pb.authStore.save(token, null)
    await pb.collection('users').authRefresh()

    const record = pb.authStore.record
    useAuthStore.getState().setAuth(token, encrypted, {
      id: record?.id ?? '',
      email: record?.email ?? '',
    })
    return true
  } catch {
    localStorage.removeItem('enc_token')
    return false
  }
}

export function logout() {
  pb.authStore.clear()
  localStorage.removeItem('enc_token')
  useAuthStore.getState().clearAuth()
}