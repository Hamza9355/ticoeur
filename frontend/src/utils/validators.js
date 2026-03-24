/**
 * Utilitaires de validation pour le frontend
 */

export const validators = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  },

  phone: (phone) => {
    const regex = /^[\d\s\-+().]+$/
    return phone.length >= 9 && regex.test(phone)
  },

  required: (value) => {
    return value && value.trim().length > 0
  },

  minLength: (value, min) => {
    return value && value.length >= min
  },

  maxLength: (value, max) => {
    return value && value.length <= max
  },

  zipCode: (zipCode) => {
    return /^\d{4,5}$/.test(zipCode)
  }
}

export const validateCustomer = (customer) => {
  const errors = {}

  if (!validators.required(customer.firstName)) errors.firstName = 'Le prénom est requis'
  if (!validators.required(customer.lastName)) errors.lastName = 'Le nom est requis'
  if (!validators.email(customer.email)) errors.email = 'Email invalide'
  if (!validators.phone(customer.phone)) errors.phone = 'Téléphone invalide'
  if (!validators.required(customer.address)) errors.address = 'Adresse requise'
  if (!validators.required(customer.city)) errors.city = 'Ville requise'
  if (!validators.zipCode(customer.zipCode)) errors.zipCode = 'Code postal invalide'
  if (!validators.required(customer.country)) errors.country = 'Pays requis'

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const sanitizeInput = (input) => {
  return input
    .replace(/[<>]/g, '') // Éviter les injections HTML
    .trim()
}
