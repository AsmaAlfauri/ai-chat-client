
# AI Chat Desktop Client

A desktop AI chat application built with Electron, React, TypeScript, and PocketBase.

## Prerequisites

- Node.js v18+
- PocketBase binary (included in `/pocketbase` folder)

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Fix Electron binary (Windows only)
Download `electron-v30.5.1-win32-x64.zip` from:
https://github.com/electron/electron/releases/tag/v30.5.1

Extract all contents into:
`node_modules/electron/dist/`

Then run:
```bash
printf "dist/electron.exe" > node_modules/electron/path.txt
```

### 3. Start PocketBase
```bash
cd pocketbase
./pocketbase.exe serve
```
First run: open the printed URL to create your superuser account.
Schema is automatically applied via migration script in `/pocketbase/pb_migrations/`.

### 4. Create a Test User
```bash
./pocketbase.exe superuser upsert your@email.com yourpassword
```
Or from the dashboard: `http://127.0.0.1:8090/_/` → Collections → users → New record

### 5. Start Mock AI Server
```bash
npm run mock-ai
```

### 6. Start the App
```bash
npm run dev
```

## What Works
- Email/password login with session persistence
- Token stored via Electron safeStorage (not plaintext)
- Conversations: create, rename, delete
- Chat: send messages, receive echo reply
- History persists after restart
- Markdown rendering in AI replies
- Error states on failed requests
- Light/Dark theme (persisted)
- OAuth login: Google & GitHub via PocketBase
- Error logging: main + renderer errors written to app.log
- Unit tests: chatStore send/persist logic

## Known Issues / Not Implemented
- Electron binary download fails automatically on some Windows machines (manual fix documented above)
- Nice-to-haves skipped: optimistic updates, realtime sync, auto-update