import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Leaf, Zap } from 'lucide-react'

function Home() {
  const features = [
    {
      icon: Leaf,
      title: '100% Bio',
      description: 'Ingrédients naturels et biologiques, sans additifs'
    },
    {
      icon: Heart,
      title: 'Faits avec Amour',
      description: 'Chaque tisane est préparée avec passion et soin'
    },
    {
      icon: Zap,
      title: 'Bienfaisant',
      description: 'Formules spéciales pour votre bien-être quotidien'
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-900 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-cream max-w-2xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-warm">
              Ti'Coeur
            </h1>
            <p className="text-2xl md:text-3xl mb-8 font-light">
              Découvrez nos tisanes bienfaisantes 100% bio
            </p>
            <p className="text-lg mb-12 text-cream/90">
              Faites avec amour, pour votre bien-être
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/products"
                className="bg-warm hover:bg-gold text-primary-900 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 inline-block"
              >
                Voir nos Produits
              </Link>
              <Link
                to="/about"
                className="border-2 border-warm text-warm hover:bg-warm hover:text-primary-900 px-8 py-4 rounded-lg font-bold text-lg transition"
              >
                En Savoir Plus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full bg-black">
        <video
          src="/assets/videos/PUB.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full h-auto"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 text-center mb-16">
            Pourquoi Choisir Ti'Coeur?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition"
                >
                  <Icon size={48} className="mx-auto mb-4 text-warm" />
                  <h3 className="text-2xl font-bold text-primary-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 text-center mb-16">
            Nos Ingrédients Secrets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-warm mb-4">Tisane Harmonie</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🍋 Feuilles de verveine citronnée</li>
                <li>🌺 Fleurs d'hibiscus</li>
                <li>🌹 Pétales de rose</li>
                <li>🌿 Menthe douce</li>
                <li>🍏 Morceaux de pomme</li>
                <li>💗 Une touche d'amour</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-warm mb-4">Tisane Sérénité</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🍊 Écorces d'orange</li>
                <li>🌼 Camomille romaine</li>
                <li>🍃 Mélisse</li>
                <li>🌱 Gingembre doux</li>
                <li>🌸 Cannelle en bâton</li>
                <li>✨ Quelques trésors discrets</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-warm mb-6">
            Prêt à Découvrir le Bien-être?
          </h2>
          <p className="text-cream mb-8 text-lg">
            Commandez dès maintenant et recevez votre première tisane chez vous
          </p>
          <Link
            to="/products"
            className="bg-warm hover:bg-gold text-primary-900 px-10 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 inline-block"
          >
            Parcourir la Collection
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
