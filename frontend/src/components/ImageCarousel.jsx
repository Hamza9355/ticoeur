import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function ImageCarousel() {
  const images = [
    '/assets/images/PRODUIT.jpeg',
    '/assets/images/PRODUIT2.jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49.jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49 (1).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49 (2).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49 (3).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49 (4).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.49 (5).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.50 (1).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.50 (2).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.50 (3).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.50 (4).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.51 (1).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.51 (2).jpeg',
    '/assets/images/WhatsApp Image 2026-04-21 at 23.37.51.jpeg',
  ]

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrent((prev) => (prev + newDirection + images.length) % images.length)
  }

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-96 md:h-screen bg-primary-900 overflow-hidden group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current}
          src={images[current]}
          alt={`Slide ${current + 1}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? 'bg-warm w-8'
                : 'bg-white/50 hover:bg-white/70 w-2'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-6 right-6 z-10 bg-black/40 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-semibold">
        {current + 1} / {images.length}
      </div>
    </div>
  )
}

export default ImageCarousel
