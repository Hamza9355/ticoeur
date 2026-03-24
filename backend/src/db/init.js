import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let db = null

export async function getDatabase() {
  if (db) {
    return db
  }

  db = await open({
    filename: join(__dirname, '..', '..', 'ticoeur.db'),
    driver: sqlite3.Database
  })

  // Activer les clés étrangères
  await db.exec('PRAGMA foreign_keys = ON')

  return db
}

export async function initializeDatabase() {
  const database = await getDatabase()

  // Table des produits
  await database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      price REAL NOT NULL,
      image TEXT,
      ingredients TEXT,
      stock INTEGER DEFAULT 100,
      category TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Table des commandes
  await database.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customerFirstName TEXT NOT NULL,
      customerLastName TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      customerPhone TEXT,
      customerAddress TEXT,
      customerCity TEXT,
      customerZipCode TEXT,
      customerCountry TEXT,
      subtotal REAL NOT NULL,
      shipping REAL DEFAULT 0,
      tax REAL DEFAULT 0,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      items TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Vérifier si les produits existent déjà
  const count = await database.get('SELECT COUNT(*) as count FROM products')
  
  if (count.count === 0) {
    // Insérer les 20 produits d'exemple
    const products = [
      { name: 'Harmonie Douce', price: 45, description: 'Un mélange relaxant', ingredients: 'Verveine, Hibiscus, Rose' },
      { name: 'Sérénité Orange', price: 50, description: 'Camomille et orange', ingredients: 'Orange, Camomille, Mélisse' },
      { name: 'Roses Éternelles', price: 55, description: 'Pétales de rose', ingredients: 'Rose, Hibiscus, Menthe' },
      { name: 'Pomme Cannelle', price: 48, description: 'Douceur chaude', ingredients: 'Pomme, Cannelle, Gingembre' },
      { name: 'Menthe Rafraîchissante', price: 42, description: 'Menthe douce', ingredients: 'Menthe, Citron, Pomme' },
      { name: 'Gingembre Chaleur', price: 52, description: 'Gingembre doux', ingredients: 'Gingembre, Cannelle, Orange' },
      { name: 'Hibiscus Vibrant', price: 46, description: 'Fleur riche', ingredients: 'Hibiscus, Pomme, Menthe' },
      { name: 'Lotus Détente', price: 58, description: 'Sommeil apaisé', ingredients: 'Camomille, Mélisse, Valériane' },
      { name: 'Vanille Caramel', price: 54, description: 'Goût sucré', ingredients: 'Vanille, Caramel, Pomme' },
      { name: 'Citron Frais', price: 44, description: 'Citron vivifiant', ingredients: 'Citron, Menthe, Verveine' },
      { name: 'Rose Luxe Premium', price: 65, description: 'Collection premium', ingredients: 'Rose premium, Safran' },
      { name: 'Bien-être Total', price: 60, description: 'Santé globale', ingredients: 'Curcuma, Gingembre, Hibiscus' },
      { name: 'Rêves Doux', price: 56, description: 'Avant le coucher', ingredients: 'Camomille, Lavande, Mélisse' },
      { name: 'Passion Fruit', price: 49, description: 'Saveurs tropicales', ingredients: 'Fruit de la passion, Hibiscus' },
      { name: 'Miel Douceur', price: 53, description: 'Sucré naturellement', ingredients: 'Miel, Pomme, Camomille' },
      { name: 'Énergies Naturelles', price: 51, description: 'Boost naturel', ingredients: 'Maté, Gingembre, Citron' },
      { name: 'Herbes Sauvages', price: 47, description: 'Herbes naturelles', ingredients: 'Thym, Origan, Menthe' },
      { name: 'Baie Antioxydant', price: 57, description: 'Baies rouges', ingredients: 'Baies rouges, Hibiscus' },
      { name: 'Gourmand Chocolat', price: 59, description: 'Sensation cacao', ingredients: 'Cacao, Cannelle, Vanille' },
      { name: 'Sérénité Totale', price: 62, description: 'Anti-stress', ingredients: 'Lavande, Mélisse, Camomille' }
    ]

    for (const product of products) {
      await database.run(
        'INSERT INTO products (name, price, description, ingredients) VALUES (?, ?, ?, ?)',
        [product.name, product.price, product.description, product.ingredients]
      )
    }

    console.log('✅ 20 produits ont été insérés dans la base de données')
  }

  console.log('✅ Base de données initialisée avec succès')
}

export default getDatabase
