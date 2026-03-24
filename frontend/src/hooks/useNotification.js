import { useState, useCallback } from 'react'

export const useNotification = () => {
  const [notification, setNotification] = useState(null)

  const show = useCallback((message, type = 'success', duration = 3000) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), duration)
  }, [])

  return { notification, show }
}
