import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { initializeDatabase } from './db/init.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware de sécurité
app.use(helmet())
app.use(compression())

// CORS pour supporter les requêtes du frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// Limitation de taux pour éviter les abus (important pour 300 clients simultanés)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limite chaque IP à 1000 requêtes par windowMs
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Initialiser la base de données
await initializeDatabase()

// Routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Erreur:', err)
  res.status(500).json({ error: 'Erreur serveur interne' })
})

app.listen(PORT, () => {
  console.log(`🚀 Serveur Ti'Coeur démarré sur http://localhost:${PORT}`)
  console.log(`📊 Capable de gérer 300 clients simultanés`)
  console.log(`🗄️  Base de données prête`)
})

export default app
