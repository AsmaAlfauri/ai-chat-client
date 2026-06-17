import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  storeToken: (token: string) => ipcRenderer.invoke('store-token', token),
  loadToken: (encrypted: string) => ipcRenderer.invoke('load-token', encrypted),
})