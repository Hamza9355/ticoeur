import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useState } from 'react'

function Navbar() {
  const { items } = useCartStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/images/LOGO.jpeg" alt="Ti'Coeur" className="h-12 w-12 object-contain rounded-full" />
            <span className="text-2xl font-bold text-warm hidden sm:inline">Ti'Coeur</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-cream hover:text-warm transition font-medium">Accueil</Link>
            <Link to="/about" className="text-cream hover:text-warm transition font-medium">À Propos</Link>
            <Link to="/products" className="text-cream hover:text-warm transition font-medium">Produits</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-cream hover:text-warm transition">
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
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
          <div className="md:hidden pb-4 border-t border-primary-700">
            <Link to="/" className="block py-2 text-cream hover:text-warm">Accueil</Link>
            <Link to="/about" className="block py-2 text-cream hover:text-warm">À Propos</Link>
            <Link to="/products" className="block py-2 text-cream hover:text-warm">Produits</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
