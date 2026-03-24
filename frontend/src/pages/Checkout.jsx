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
  const shipping = subtotal > 200 ? 0 : 30
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

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
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Finaliser la Commande</h1>

        {errors.submit && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
            <p className="text-red-700">{errors.submit}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Informations de Livraison</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm ${errors.firstName ? 'border-red-500' : 'border-primary-300'}`}
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm ${errors.lastName ? 'border-red-500' : 'border-primary-300'}`}
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm ${errors.email ? 'border-red-500' : 'border-primary-300'}`}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm ${errors.phone ? 'border-red-500' : 'border-primary-300'}`}
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm mb-6 ${errors.address ? 'border-red-500' : 'border-primary-300'}`}
                />
                {errors.address && <p className="text-red-600 text-sm mb-4">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm ${errors.city ? 'border-red-500' : 'border-primary-300'}`}
                  />
                  {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Code Postal"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm ${errors.zipCode ? 'border-red-500' : 'border-primary-300'}`}
                  />
                  {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm bg-white"
                >
                  <option>Maroc</option>
                  <option>France</option>
                  <option>Belgique</option>
                  <option>Suisse</option>
                  <option>Canada</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white font-bold py-4 rounded-lg transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Traitement...' : 'Confirmer la Commande'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Résumé Commande</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} DH</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-primary-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{subtotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span>{shipping.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxe</span>
                  <span>{tax.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary-900 border-t pt-4">
                  <span>Total</span>
                  <span>{total.toFixed(2)} DH</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

  if (items.length === 0 && !orderDone) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Panier Vide</h1>
          <p className="text-gray-600 mb-8">Veuillez ajouter des articles avant de procéder au paiement</p>
          <button onClick={() => navigate('/products')} className="text-warm font-bold">
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
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Finaliser la Commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Informations de Livraison</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm mb-6"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Code Postal"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm"
                />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm bg-white"
                >
                  <option>Maroc</option>
                  <option>France</option>
                  <option>Belgique</option>
                  <option>Suisse</option>
                  <option>Canada</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white font-bold py-4 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Traitement...' : 'Confirmer la Commande'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Résumé Commande</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} DH</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-primary-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{subtotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span>{shipping.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxe</span>
                  <span>{tax.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary-900 border-t pt-4">
                  <span>Total</span>
                  <span>{total.toFixed(2)} DH</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
