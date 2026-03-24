import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`)
}

export const orderService = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`)
}

export const statsService = {
  getStats: () => api.get('/orders/stats/dashboard')
}

export default api
