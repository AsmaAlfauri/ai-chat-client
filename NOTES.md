
# Notes

## Architecture

The app follows a clean Electron main/renderer split:

- **Main process** (`electron/main.ts`): creates the window, handles safeStorage via IPC
- **Preload bridge** (`electron/preload.ts`): exposes only `storeToken` and `loadToken` to the renderer
- **Renderer** (React): all UI, Zustand stores, PocketBase calls

## State Management

Three focused Zustand stores:
- `authStore`: user session and token
- `conversationStore`: sidebar list and active conversation
- `chatStore`: messages, loading, error states

## Security

- `contextIsolation: true`, `nodeIntegration: false`
- Token encrypted via `safeStorage`, stored as base64 in localStorage (never plaintext)
- CSP header set in index.html

## What I'd Do Next

- Add PocketBase migration script for one-command schema setup
- Add unit tests for sendMessage and persistence logic
- Optimistic message send with rollback on error
- Light/Dark theme toggle

## What I Cut & Why

- **OAuth**: would add complexity without demonstrating more architecture
- **Realtime sync**: PocketBase subscriptions are straightforward but out of scope for 2-3 days
- **Auto-update**: nice demo but not core functionality
- **Virtualised list**: not needed for typical chat history length

## Bonus: Basic Error Logging
- Chose this over theme/OAuth/auto-update because it adds 
  real production value with minimal scope creep.
- Main errors caught via uncaughtException → app.log
- Renderer errors sent via IPC bridge → same log file

## Bonus: OAuth login via PocketBase built-in OAuth2
- Supports Google and GitHub
- Same token storage flow as email/password (safeStorage)