import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

// Sample products data - 20 items
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Harmonie Douce',
    price: 45,
    image: 'https://via.placeholder.com/300x200?text=Harmonie+Douce',
    description: 'Un mélange relaxant de verveine et hibiscus',
    ingredients: 'Verveine citronnée, Hibiscus, Rose, Menthe douce'
  },
  {
    id: 2,
    name: 'Sérénité Orange',
    price: 50,
    image: 'https://via.placeholder.com/300x200?text=Serenite+Orange',
    description: 'Camomille et orange pour la détente',
    ingredients: 'Orange, Camomille, Mélisse, Gingembre'
  },
  {
    id: 3,
    name: 'Roses Éternelles',
    price: 55,
    image: 'https://via.placeholder.com/300x200?text=Roses+Eternelles',
    description: 'Pétales de rose pour une expérience luxe',
    ingredients: 'Pétales de rose, Hibiscus, Menthe, Pomme'
  },
  {
    id: 4,
    name: 'Pomme Cannelle',
    price: 48,
    image: 'https://via.placeholder.com/300x200?text=Pomme+Cannelle',
    description: 'Douceur chaude de la cannelle et pomme',
    ingredients: 'Pomme, Cannelle, Gingembre, Hibiscus'
  },
  {
    id: 5,
    name: 'Menthe Rafraîchissante',
    price: 42,
    image: 'https://via.placeholder.com/300x200?text=Menthe+Rafraichissante',
    description: 'Menthe douce pour la fraîcheur',
    ingredients: 'Menthe douce, Citron, Verbascum, Pomme'
  },
  {
    id: 6,
    name: 'Gingembre Chaleur',
    price: 52,
    image: 'https://via.placeholder.com/300x200?text=Gingembre+Chaleur',
    description: 'Gingembre doux pour l\'immunité',
    ingredients: 'Gingembre, Cannelle, Orange, Poivre noir'
  },
  {
    id: 7,
    name: 'Hibiscus Vibrant',
    price: 46,
    image: 'https://via.placeholder.com/300x200?text=Hibiscus+Vibrant',
    description: 'Fleur d\'hibiscus riche en antioxydants',
    ingredients: 'Hibiscus, Pomme, Menthe, Citron'
  },
  {
    id: 8,
    name: 'Lotus Détente',
    price: 58,
    image: 'https://via.placeholder.com/300x200?text=Lotus+Detente',
    description: 'Mélange premium pour un sommeil apaisé',
    ingredients: 'Camomille, Mélisse, Valériane, Rose'
  },
  {
    id: 9,
    name: 'Vanille Caramel',
    price: 54,
    image: 'https://via.placeholder.com/300x200?text=Vanille+Caramel',
    description: 'Goût sucré et réconfortant',
    ingredients: 'Vanille, Caramel, Pomme, Hibiscus'
  },
  {
    id: 10,
    name: 'Citron Frais',
    price: 44,
    image: 'https://via.placeholder.com/300x200?text=Citron+Frais',
    description: 'Citron vivifiant pour l\'énergie',
    ingredients: 'Citron, Menthe, Verveine, Gingembre'
  },
  {
    id: 11,
    name: 'Rose Luxe Premium',
    price: 65,
    image: 'https://via.placeholder.com/300x200?text=Rose+Luxe+Premium',
    description: 'Collection premium de pétales de rose',
    ingredients: 'Rose premium, Safran, Hibiscus, Miel'
  },
  {
    id: 12,
    name: 'Bien-être Total',
    price: 60,
    image: 'https://via.placeholder.com/300x200?text=Bien-etre+Total',
    description: 'Blend complet pour la santé globale',
    ingredients: 'Curcuma, Gingembre, Hibiscus, Orange, Miel'
  },
  {
    id: 13,
    name: 'Rêves Doux',
    price: 56,
    image: 'https://via.placeholder.com/300x200?text=Reves+Doux',
    description: 'Idéale avant le coucher',
    ingredients: 'Camomille, Lavande, Mélisse, Menthe'
  },
  {
    id: 14,
    name: 'Passion Fruit',
    price: 49,
    image: 'https://via.placeholder.com/300x200?text=Passion+Fruit',
    description: 'Saveurs tropicales exotiques',
    ingredients: 'Fruit de la passion, Hibiscus, Pomme, Citron'
  },
  {
    id: 15,
    name: 'Miel Douceur',
    price: 53,
    image: 'https://via.placeholder.com/300x200?text=Miel+Douceur',
    description: 'Sucré naturellement au miel',
    ingredients: 'Miel, Pomme, Camomille, Gingembre'
  },
  {
    id: 16,
    name: 'Énergies Naturelles',
    price: 51,
    image: 'https://via.placeholder.com/300x200?text=Energies+Naturelles',
    description: 'Boost naturel d\'énergies',
    ingredients: 'Maté, Gingembre, Citron, Menthe'
  },
  {
    id: 17,
    name: 'Herbes Sauvages',
    price: 47,
    image: 'https://via.placeholder.com/300x200?text=Herbes+Sauvages',
    description: 'Mélange rustique d\'herbes naturelles',
    ingredients: 'Thym, Origan, Menthe, Verveine'
  },
  {
    id: 18,
    name: 'Baie Antioxydant',
    price: 57,
    image: 'https://via.placeholder.com/300x200?text=Baie+Antioxydant',
    description: 'Baies rouges pour l\'énergie',
    ingredients: 'Baies rouges, Hibiscus, Pomme, Rose hips'
  },
  {
    id: 19,
    name: 'Gourmand Chocolat',
    price: 59,
    image: 'https://via.placeholder.com/300x200?text=Gourmand+Chocolat',
    description: 'Sensation cacao et chocolat',
    ingredients: 'Cacao, Cannelle, Vanille, Pomme'
  },
  {
    id: 20,
    name: 'Sérénité Totale',
    price: 62,
    image: 'https://via.placeholder.com/300x200?text=Serenite+Totale',
    description: 'Formule premium anti-stress',
    ingredients: 'Lavande, Mélisse, Camomille, Basilic sacré'
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
          <p className="text-xl">Découvrez nos 20 tisanes bienfaisantes</p>
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
