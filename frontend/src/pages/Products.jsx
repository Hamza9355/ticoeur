import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

// Our main products
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Produit 1 - Paquet 10 Sachets',
    price: 100,
    image: '/assets/images/PRODUIT.jpeg',
    description: 'Paquet complet de 10 sachets de tisane premium',
    ingredients: 'Ingrédients naturels 100% bio'
  },
  {
    id: 2,
    name: 'Produit 2 - Paquet 10 Sachets',
    price: 100,
    image: '/assets/images/PRODUIT2.jpeg',
    description: 'Paquet complet de 10 sachets de tisane premium',
    ingredients: 'Ingrédients naturels 100% bio'
  },
  {
    id: 3,
    name: 'Sachet Individuel',
    price: 10,
    image: '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49.jpeg',
    description: 'Un seul sachet de tisane premium pour déguster',
    ingredients: 'Ingrédients naturels 100% bio'
  },
  {
    id: 4,
    name: 'Pack 2 Paquets - Edition Spéciale',
    price: 180,
    image: '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49 (1).jpeg',
    description: '2 paquets complets de 10 sachets chacun - Offre groupée',
    ingredients: 'Ingrédients naturels 100% bio'
  }
]

function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    // In a real app, this would fetch from the backend
    setProducts(SAMPLE_PRODUCTS)
    setFilteredProducts(SAMPLE_PRODUCTS)
  }, [])

  useEffect(() => {
    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(filtered)
  }, [searchTerm, sortBy, products])

  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800 text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-warm mb-4"
          >
            Notre Collection
          </motion.h1>
          <p className="text-xl">Découvrez nos tisanes bienfaisantes premium</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <input
              type="text"
              placeholder="Rechercher une tisane..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-primary-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-warm"
            >
              <option value="name">Nom (A-Z)</option>
              <option value="price-low">Prix (Bas au Haut)</option>
              <option value="price-high">Prix (Haut au Bas)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-primary-900 font-semibold">
              {filteredProducts.length} produit(s) trouvé(s)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
