import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import { seedPortfolioIfEmpty } from './utils/seed.js'
import { migrateLegacyPortfolioFields } from './utils/migratePortfolio.js'
import authRoutes from './routes/auth.js'
import portfolioRoutes from './routes/portfolio.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.join(__dirname, 'uploads')

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
)
app.use(express.json({ limit: '12mb' }))
app.use('/uploads', express.static(uploadsDir))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({
    message: err.message || 'Internal server error',
  })
})

async function start() {
  await connectDB()
  await migrateLegacyPortfolioFields()
  await seedPortfolioIfEmpty()

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
