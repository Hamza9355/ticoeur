import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useState } from 'react'
import { motion } from 'framer-motion'

function Navbar() {
  const { items } = useCartStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/about', label: 'À Propos' },
    { to: '/products', label: 'Produits' }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 shadow-xl backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              src="/assets/images/LOGO.jpeg" 
              alt="Ti'Coeur" 
              className="h-14 w-14 object-contain rounded-full shadow-lg group-hover:shadow-warm/50 transition-shadow" 
              whileHover={{ scale: 1.1 }}
            />
            <motion.span 
              className="text-2xl font-bold text-warm hidden sm:inline"
              whileHover={{ scale: 1.05 }}
            >
              Ti'Coeur
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="relative text-cream hover:text-warm px-4 py-2 rounded-lg transition font-medium group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-warm to-yellow-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-cream hover:text-warm transition group">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                <ShoppingCart size={28} />
              </motion.div>
              {cartCount > 0 && (
                <motion.span 
                  className="absolute -top-3 -right-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <button
              className="md:hidden text-cream"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 border-t border-primary-700 space-y-2"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="block py-2 px-4 text-cream hover:text-warm hover:bg-primary-700/50 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
