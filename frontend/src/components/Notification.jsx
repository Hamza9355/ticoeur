import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export function Notification({ message, type = 'success', onClose }) {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <X size={20} />
      </button>
    </motion.div>
  )
}
