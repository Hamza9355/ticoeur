import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { motion } from 'framer-motion'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart(product)
    // Toast notification would go here
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
        <img
          src="/assets/images/conceptv2.png"
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-warm text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.price.toFixed(2)} DH
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-primary-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="mb-3">
          <p className="text-xs text-primary-700 font-semibold mb-1">🌿 Ingrédients:</p>
          <p className="text-xs text-gray-600 line-clamp-2">{product.ingredients}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Ajouter au Panier
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
