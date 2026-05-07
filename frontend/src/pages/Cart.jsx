import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 200 ? 0 : 25
  const tax = 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-primary-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-5xl font-bold text-primary-900 mb-4">Panier Vide</h1>
          <p className="text-gray-600 mb-8 text-lg">Découvrez nos tisanes et commencez vos achats</p>
          <Link
            to="/products"
            className="bg-gradient-to-r from-warm to-yellow-500 hover:from-yellow-500 hover:to-warm text-primary-900 px-8 py-4 rounded-lg font-bold transition inline-block shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Continuer vos achats
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-primary-900 mb-2"
        >
          Votre Panier
        </motion.h1>
        <p className="text-gray-600 mb-8">{items.length} article{items.length > 1 ? 's' : ''} en attente</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-100"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-6 flex gap-6 hover:bg-primary-50 transition ${index !== items.length - 1 ? 'border-b border-primary-100' : ''}`}
                >
                  <motion.img
                    src={item.image || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl shadow-md"
                    whileHover={{ scale: 1.05 }}
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">{item.name}</h3>
                    <p className="text-warm font-semibold mb-4 text-lg">{item.price.toFixed(2)} DH</p>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center border-2 border-primary-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-primary-100 transition text-primary-900 font-bold"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="px-4 font-bold text-lg text-primary-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-primary-100 transition text-primary-900 font-bold"
                        >
                          <Plus size={20} />
                        </button>
                      </div>

                      <span className="font-bold text-primary-900 text-lg ml-auto">
                        {(item.price * item.quantity).toFixed(2)} DH
                      </span>

                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={24} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 sticky top-32 border border-primary-100"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-8 flex items-center gap-2">
                <span className="text-2xl">💼</span>
                Résumé
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-primary-900'}`}>
                    {shipping === 0 ? '✓ Gratuite' : shipping.toFixed(2) + ' DH'}
                  </span>
                </div>

                <div className="border-t-2 border-primary-200 pt-6">
                  <div className="flex justify-between text-xl font-bold text-white bg-gradient-to-r from-primary-700 to-primary-600 p-4 rounded-xl">
                    <span>Total TTC</span>
                    <span>{total.toFixed(2)} DH</span>
                  </div>
                </div>
              </div>

              {subtotal > 200 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg"
                >
                  <p className="text-green-700 font-semibold text-sm">🎉 Livraison gratuite!</p>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/checkout"
                  className="block w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white font-bold py-4 rounded-xl text-center transition shadow-lg hover:shadow-xl text-lg"
                >
                  ✓ Passer la Commande
                </Link>
              </motion.div>

              <motion.button
                onClick={clearCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full border-2 border-primary-700 text-primary-700 hover:bg-primary-50 font-bold py-3 rounded-lg transition mt-4"
              >
                Vider le Panier
              </motion.button>

              <Link
                to="/products"
                className="block w-full text-center text-warm font-bold py-3 mt-4 hover:underline text-sm"
              >
                ← Continuer vos achats
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
