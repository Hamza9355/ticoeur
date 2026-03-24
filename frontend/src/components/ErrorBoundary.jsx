import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur capturée:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Erreur!</h1>
            <p className="text-gray-700 mb-6">{this.state.error?.message || 'Une erreur inattendue s\'est produite'}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-warm text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition"
            >
              Recharger la page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
