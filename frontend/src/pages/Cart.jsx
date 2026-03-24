import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 200 ? 0 : 30
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Panier Vide</h1>
          <p className="text-gray-600 mb-8 text-lg">Découvrez nos tisanes et commencez vos achats</p>
          <Link
            to="/products"
            className="bg-warm hover:bg-gold text-primary-900 px-8 py-4 rounded-lg font-bold transition inline-block"
          >
            Continuer vos achats
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Votre Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="border-b border-primary-100 p-6 flex gap-4"
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary-900">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.price.toFixed(2)} DH</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-primary-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-primary-50 transition"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-primary-50 transition"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <span className="font-bold text-primary-900 ml-auto">
                        {(item.price * item.quantity).toFixed(2)} DH
                      </span>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Résumé</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-semibold">{shipping.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxe (10%)</span>
                  <span className="font-semibold">{tax.toFixed(2)} DH</span>
                </div>

                <div className="border-t-2 border-primary-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-primary-900">
                    <span>Total</span>
                    <span>{total.toFixed(2)} DH</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white font-bold py-3 rounded-lg text-center transition mb-4"
              >
                Passer la Commande
              </Link>

              <button
                onClick={clearCart}
                className="block w-full border-2 border-primary-700 text-primary-700 hover:bg-primary-50 font-bold py-3 rounded-lg transition"
              >
                Vider le Panier
              </button>

              <Link
                to="/products"
                className="block w-full text-center text-warm font-bold py-3 mt-4 hover:underline"
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
