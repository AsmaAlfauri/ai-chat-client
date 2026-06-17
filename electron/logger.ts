import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'

const logPath = path.join(app.getPath('userData'), 'app.log')

export function log(level: 'INFO' | 'ERROR', message: string) {
  const line = `[${new Date().toISOString()}] [${level}] ${message}\n`
  fs.appendFileSync(logPath, line)
}

export function logError(message: string) {
  log('ERROR', message)
}