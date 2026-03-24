import { motion } from 'framer-motion'

function About() {
  return (
    <div className="w-full bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800 text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-warm mb-4">Qui Sommes-Nous?</h1>
            <p className="text-xl">L'histoire de Ti'Coeur, née d'amour et de passion</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Ti'Coeur est née d'une passion simple: créer des tisanes qui réchauffent le cœur et apaisent l'âme. 
                Inspirée par la richesse des traditions marocaines et le pouvoir des plantes naturelles, 
                notre aventure a commencé dans une petite cuisine remplie d'amour et de rêves.
              </p>
              <p>
                Chaque blend est soigneusement sélectionné, chaque ingrédient est 100% bio et provient directement 
                de producteurs locaux de confiance. Pour nous, la qualité n'est pas un compromis, c'est notre promesse.
              </p>
              <p>
                Nous croyons que le bien-être commence par ce que vous consommez. Nos tisanes sont plus qu'une 
                boisson - elles sont un moment de sérénité, une pause bienfaisante, un acte d'amour envers vous-même.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-6">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-warm mb-3">🌿 Authenticité</h3>
                <p className="text-gray-700">
                  Des ingrédients vrais, des formules authentiques, zéro compromis sur la qualité.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-warm mb-3">💗 Amour</h3>
                <p className="text-gray-700">
                  Chaque tisane est préparée avec amour, comme si c'était pour quelqu'un que nous chérissons.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-warm mb-3">♻️ Durabilité</h3>
                <p className="text-gray-700">
                  Respect de l'environnement à travers des emballages éco-responsables et des pratiques durables.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-warm mb-3">🤝 Communauté</h3>
                <p className="text-gray-700">
                  Nous soutenons les producteurs locaux et contribuons au bien-être de nos communautés.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
