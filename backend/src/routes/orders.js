import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { getDatabase } from '../db/init.js'

const router = express.Router()

// Créer une nouvelle commande
router.post('/', async (req, res) => {
  try {
    const db = await getDatabase()
    const { customer, items, subtotal, shipping, tax, total } = req.body

    // Validation basique
    if (!customer || !items || !total) {
      return res.status(400).json({ error: 'Données de commande incomplètes' })
    }

    const orderId = uuidv4()
    const now = new Date().toISOString()

    await db.run(
      `INSERT INTO orders (
        id, customerFirstName, customerLastName, customerEmail, customerPhone,
        customerAddress, customerCity, customerZipCode, customerCountry,
        subtotal, shipping, tax, total, status, items, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.phone,
        customer.address,
        customer.city,
        customer.zipCode,
        customer.country,
        subtotal,
        shipping,
        tax,
        total,
        'pending',
        JSON.stringify(items),
        now,
        now
      ]
    )

    res.status(201).json({
      id: orderId,
      status: 'pending',
      message: 'Commande créée avec succès'
    })
  } catch (error) {
    console.error('Erreur créer commande:', error)
    res.status(500).json({ error: 'Erreur serveur lors de la création de la commande' })
  }
})

// GET toutes les commandes (pour l'admin)
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase()
    const { status, limit = 50, offset = 0 } = req.query

    let query = 'SELECT * FROM orders WHERE 1=1'
    const params = []

    if (status) {
      query += ' AND status = ?'
      params.push(status)
    }

    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?'
    params.push(parseInt(limit), parseInt(offset))

    const orders = await db.all(query, params)

    // Parser les items JSON
    const parsedOrders = orders.map(order => ({
      ...order,
      _id: order.id,
      items: JSON.parse(order.items || '[]'),
      customer: {
        firstName: order.customerFirstName,
        lastName: order.customerLastName,
        email: order.customerEmail,
        phone: order.customerPhone,
        address: order.customerAddress,
        city: order.customerCity,
        zipCode: order.customerZipCode,
        country: order.customerCountry
      }
    }))

    res.json(parsedOrders)
  } catch (error) {
    console.error('Erreur GET commandes:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// GET commande spécifique
router.get('/:id', async (req, res) => {
  try {
    const db = await getDatabase()
    const order = await db.get('SELECT * FROM orders WHERE id = ?', [req.params.id])

    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' })
    }

    const parsedOrder = {
      ...order,
      _id: order.id,
      items: JSON.parse(order.items || '[]'),
      customer: {
        firstName: order.customerFirstName,
        lastName: order.customerLastName,
        email: order.customerEmail,
        phone: order.customerPhone,
        address: order.customerAddress,
        city: order.customerCity,
        zipCode: order.customerZipCode,
        country: order.customerCountry
      }
    }

    res.json(parsedOrder)
  } catch (error) {
    console.error('Erreur GET commande:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Stats pour le dashboard admin
router.get('/stats/dashboard', async (req, res) => {
  try {
    const db = await getDatabase()

    const totalOrders = await db.get('SELECT COUNT(*) as count FROM orders')
    const totalRevenue = await db.get('SELECT SUM(total) as sum FROM orders')
    const pendingOrders = await db.get('SELECT COUNT(*) as count FROM orders WHERE status = ?', ['pending'])

    res.json({
      totalOrders: totalOrders.count,
      totalRevenue: totalRevenue.sum || 0,
      pendingOrders: pendingOrders.count
    })
  } catch (error) {
    console.error('Erreur GET stats:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
