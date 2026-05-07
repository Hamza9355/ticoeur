import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { motion } from 'framer-motion'
import { useState } from 'react'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group h-full flex flex-col"
    >
      <div className="relative h-56 bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition duration-300" />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-warm to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {product.price.toFixed(2)} DH
        </div>
        
        {/* Badge pour nouveau/spécial */}
        {product.id === 4 && (
          <motion.div 
            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ Promo
          </motion.div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-primary-900 mb-2 line-clamp-2 group-hover:text-warm transition">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{product.description}</p>

        <div className="mb-4 pb-4 border-b border-primary-100">
          <p className="text-xs text-primary-700 font-bold mb-1 uppercase tracking-wide">🌿 Ingrédients:</p>
          <p className="text-xs text-gray-600 line-clamp-2">{product.ingredients}</p>
        </div>

        <motion.button
          onClick={handleAddToCart}
          className={`w-full font-bold py-3 px-4 rounded-lg transition transform active:scale-95 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
            isAdded
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white hover:scale-105'
          }`}
          whileHover={!isAdded ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          {isAdded ? (
            <>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>✓</motion.span>
              Ajouté au panier!
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              Ajouter au Panier
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard
