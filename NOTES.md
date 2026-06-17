# Notes

## Architecture

The app follows a clean Electron main/renderer split:

- **Main process** (`electron/main.ts`): creates the window, handles safeStorage via IPC, catches uncaught exceptions and writes to app.log
- **Preload bridge** (`electron/preload.ts`): exposes only `storeToken`, `loadToken`, `logError`, and `openExternal` to the renderer
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

- Optimistic message send with rollback on error
- Realtime sync across windows via PocketBase subscriptions
- Virtualised list for long chat histories
- Auto-update via electron-updater

## What I Cut & Why

- **Optimistic updates**: adds complexity without changing the core architecture demonstration
- **Realtime sync**: PocketBase subscriptions are straightforward but out of scope for 2-3 days
- **Auto-update**: nice demo but not core functionality
- **Virtualised list**: not needed for typical chat history length
- **Single-instance lock**: minor UX improvement, skipped to stay focused on core features

## Bonus Implemented (3/4)

### Light/Dark Theme
- Toggle persisted via localStorage
- Tailwind dark mode classes applied globally

### Basic Error Logging
- Main process errors caught via `uncaughtException` → written to `app.log` in Electron userData folder
- Renderer errors sent via IPC bridge (`logError`) → same log file
- Chose this because it adds real production value with minimal scope creep

### OAuth Login (Google & GitHub)
- Implemented via PocketBase built-in OAuth2
- Opens browser externally via `shell.openExternal` (correct Electron pattern)
- Same token storage flow as email/password (safeStorage, never plaintext)