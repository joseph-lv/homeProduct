/**
 * Small contact API for the CassieHome Tools site.
 *
 * - Saves every submission as one JSON line in ./data/contact-messages.jsonl (easy backup / grep).
 * - Optionally sends you an email when SMTP_* env vars are set (e.g. Gmail app password).
 *
 * Run: cd server && npm install && npm start
 * See ../.env.example for frontend VITE_CONTACT_API_URL.
 */

import cors from 'cors'
import express from 'express'
import fs from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'data', 'contact-messages.jsonl')
const PORT = Number(process.env.PORT || 8787)

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 25
const rateBucket = new Map()

function rateLimitOk(ip) {
  const now = Date.now()
  const entry = rateBucket.get(ip)
  if (!entry || now > entry.resetAt) {
    rateBucket.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_PER_WINDOW) return false
  entry.count += 1
  return true
}

function appendRecord(record) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  const line = JSON.stringify(record) + '\n'
  fs.appendFileSync(DATA_FILE, line, 'utf8')
}

function looksLikeEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

async function maybeSendMail(payload) {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) return

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === '1',
    auth: { user, pass },
  })

  const to = process.env.MAIL_TO || user
  const from = process.env.MAIL_FROM || `"CassieHome Tools site" <${user}>`

  const text = [
    `Name: ${payload.name}`,
    `Company: ${payload.company || '(none)'}`,
    `Email: ${payload.email}`,
    '',
    payload.message,
    '',
    `Received at: ${payload.receivedAt}`,
  ].join('\n')

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `[CassieHome Tools] Message from ${payload.name}`,
    text,
  })
}

const app = express()

const corsOrigin = process.env.CORS_ORIGIN
app.use(
  cors({
    origin: corsOrigin ? corsOrigin.split(',').map((s) => s.trim()) : true,
  }),
)
app.use(express.json({ limit: '48kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  if (!rateLimitOk(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' })
  }

  const name = String(req.body?.name ?? '').trim()
  const company = String(req.body?.company ?? '').trim()
  const email = String(req.body?.email ?? '').trim()
  const message = String(req.body?.message ?? '').trim()

  if (!name || name.length > 200) {
    return res.status(400).json({ ok: false, error: 'invalid_name' })
  }
  if (!email || email.length > 320 || !looksLikeEmail(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' })
  }
  if (!message || message.length > 20000) {
    return res.status(400).json({ ok: false, error: 'invalid_message' })
  }

  const receivedAt = new Date().toISOString()
  const record = {
    name,
    company: company.slice(0, 200),
    email,
    message,
    receivedAt,
    ip,
  }

  try {
    appendRecord(record)
  } catch (e) {
    console.error('appendRecord', e)
    return res.status(500).json({ ok: false, error: 'storage_failed' })
  }

  try {
    await maybeSendMail(record)
  } catch (e) {
    console.error('maybeSendMail', e)
    /** Still OK for visitor — message is on disk; fix SMTP and retry from logs. */
  }

  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Contact API listening on http://127.0.0.1:${PORT}`)
  console.log(`POST /api/contact — storing → ${path.relative(process.cwd(), DATA_FILE)}`)
})
