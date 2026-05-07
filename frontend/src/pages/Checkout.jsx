import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { orderService } from '../utils/api'
import { validateCustomer, sanitizeInput } from '../utils/validators'
import { CheckCircle, AlertCircle } from 'lucide-react'

function Checkout() {
  const { items, customer, setCustomer, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(customer || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Maroc'
  })

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 200 ? 0 : 25
  const tax = 0
  const total = subtotal + shipping

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeInput(value)
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const validation = validateCustomer(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    setLoading(true)

    try {
      const orderData = {
        customer: formData,
        items: items,
        subtotal,
        shipping,
        tax,
        total,
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      await orderService.create(orderData)
      setCustomer(formData)
      setOrderDone(true)

      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 3000)
    } catch (error) {
      console.error('Erreur lors de la commande:', error)
      setErrors({ submit: 'Erreur lors de la soumission. Veuillez réessayer.' })
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !orderDone) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Panier Vide</h1>
          <p className="text-gray-600 mb-8">Veuillez ajouter des articles avant de procéder au paiement</p>
          <button onClick={() => navigate('/products')} className="text-warm font-bold hover:underline">
            ← Retour aux produits
          </button>
        </div>
      </div>
    )
  }

  if (orderDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-cream flex items-center justify-center"
      >
        <div className="text-center bg-white p-12 rounded-lg shadow-xl">
          <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Commande Confirmée!</h1>
          <p className="text-gray-600 mb-8 text-lg">Merci pour votre achat. Vous serez redirigé vers l'accueil...</p>
          <p className="text-warm font-semibold">Redirection automatique en cours...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-primary-900 mb-2 text-center"
        >
          Finaliser la Commande
        </motion.h1>
        <p className="text-center text-gray-600 mb-8">Veuillez remplir vos informations de livraison</p>

        {errors.submit && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 max-w-7xl mx-auto bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg p-4 flex items-center gap-3 shadow-md"
          >
            <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
            <p className="text-red-700 font-medium">{errors.submit}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit} 
              className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100"
            >
              <h2 className="text-3xl font-bold text-primary-900 mb-8 flex items-center gap-2">
                <span className="w-10 h-10 bg-gradient-to-br from-warm to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">📍</span>
                Informations de Livraison
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label className="block text-sm font-semibold text-primary-900 mb-2">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm transition ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-primary-200 focus:border-warm'}`}
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">⚠️ {errors.firstName}</p>}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label className="block text-sm font-semibold text-primary-900 mb-2">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm transition ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-primary-200 focus:border-warm'}`}
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">⚠️ {errors.lastName}</p>}
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label className="block text-sm font-semibold text-primary-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-primary-200 focus:border-warm'}`}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">⚠️ {errors.email}</p>}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label className="block text-sm font-semibold text-primary-900 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+212 6XX-XXX-XXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm transition ${errors.phone ? 'border-red-500 bg-red-50' : 'border-primary-200 focus:border-warm'}`}
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">⚠️ {errors.phone}</p>}
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} className="mb-6">
                <label className="block text-sm font-semibold text-primary-900 mb-2">Adresse</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Votre adresse complète"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm transition ${errors.address ? 'border-red-500 bg-red-50' : 'border-primary-200 focus:border-warm'}`}
                />
                {errors.address && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">⚠️ {errors.address}</p>}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label className="block text-sm font-semibold text-primary-900 mb-2">Ville</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Casablanca"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm transition ${errors.city ? 'border-red-500 bg-red-50' : 'border-primary-200 focus:border-warm'}`}
                  />
                  {errors.city && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">⚠️ {errors.city}</p>}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label className="block text-sm font-semibold text-primary-900 mb-2">Code Postal</label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="20000"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm transition ${errors.zipCode ? 'border-red-500 bg-red-50' : 'border-primary-200 focus:border-warm'}`}
                  />
                  {errors.zipCode && <p className="text-red-600 text-sm mt-1 flex items-center gap-1">⚠️ {errors.zipCode}</p>}
                </motion.div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">Pays</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm bg-white transition"
                  >
                    <option>Maroc</option>
                    <option>France</option>
                    <option>Belgique</option>
                    <option>Suisse</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin">⏳</span>
                    Traitement en cours...
                  </span>
                ) : (
                  '✓ Confirmer la Commande'
                )}
              </motion.button>
            </motion.form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 sticky top-32 border border-primary-100"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-8 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Résumé Commande
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                {items.map(item => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between text-sm p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition"
                  >
                    <span className="text-gray-700 font-medium">{item.name} <span className="text-warm font-bold">×{item.quantity}</span></span>
                    <span className="font-bold text-primary-900">{(item.price * item.quantity).toFixed(2)} DH</span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4 border-t-2 border-primary-200 pt-6">
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

                <div className="flex justify-between text-xl font-bold text-white bg-gradient-to-r from-primary-700 to-primary-600 p-4 rounded-xl border-t-2 border-primary-200 mt-6">
                  <span>Total TTC</span>
                  <span>{total.toFixed(2)} DH</span>
                </div>
              </div>

              {subtotal > 200 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg"
                >
                  <p className="text-green-700 font-semibold text-sm">🎉 Livraison gratuite appliquée!</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
