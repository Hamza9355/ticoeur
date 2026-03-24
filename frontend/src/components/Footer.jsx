import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-warm mb-4">Ti'Coeur</h3>
            <p className="text-cream/80 mb-4">
              Des tisanes bienfaisantes 100% bio, faites avec amour pour votre bien-être.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-warm hover:text-gold transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-warm hover:text-gold transition">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-warm mb-4">Navigation</h4>
            <ul className="space-y-2 text-cream/80">
              <li><Link to="/" className="hover:text-warm transition">Accueil</Link></li>
              <li><Link to="/about" className="hover:text-warm transition">À Propos</Link></li>
              <li><Link to="/products" className="hover:text-warm transition">Produits</Link></li>
              <li><Link to="/cart" className="hover:text-warm transition">Panier</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-warm mb-4">Contact</h4>
            <div className="space-y-3 text-cream/80">
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-warm" />
                <span>+212 XXX-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-warm" />
                <span>contact@ticoeur.ma</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={20} className="text-warm mt-1" />
                <span>Maroc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-cream/70 text-sm">
          <p>&copy; 2026 Ti'Coeur. Tous droits réservés. 🌿💗</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
