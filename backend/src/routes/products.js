import express from 'express'
import { getDatabase } from '../db/init.js'

const router = express.Router()

// GET all products with caching support
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase()
    const { category, search } = req.query

    let query = 'SELECT * FROM products WHERE 1=1'
    const params = []

    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }

    query += ' ORDER BY name ASC'

    const products = await db.all(query, params)

    // Cache headers pour optimiser les performances
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600') // 5 minutes
    res.json(products)
  } catch (error) {
    console.error('Erreur GET produits:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// GET single product by id
router.get('/:id', async (req, res) => {
  try {
    const db = await getDatabase()
    const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id])

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' })
    }

    res.set('Cache-Control', 'public, max-age=600')
    res.json(product)
  } catch (error) {
    console.error('Erreur GET produit:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
