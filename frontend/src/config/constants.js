// Constantes de l'application
export const SITE_CONFIG = {
  name: 'Ti\'Coeur',
  slogan: 'Tisanes Bienfaisantes',
  version: '1.0.0',
  releaseYear: 2026
}

export const COLORS = {
  primary: {
    50: '#f5f0e8',
    100: '#ebe5d9',
    200: '#d6caad',
    300: '#c2af82',
    400: '#ad9456',
    500: '#987940',
    600: '#795d35',
    700: '#5a442a',
    800: '#3c2c1f',
    900: '#1d1614'
  },
  accent: {
    gold: '#c9a961',
    warm: '#d4a574'
  }
}

export const API_ENDPOINTS = {
  products: '/api/products',
  orders: '/api/orders'
}

export const SHIPPING_COSTS = {
  standard: 30,
  freeAbove: 200,
  taxRate: 0.1
}

export const PRODUCT_CATEGORIES = [
  'Relaxation',
  'Énergisants',
  'Digestion',
  'Sommeil',
  'Immunité'
]
