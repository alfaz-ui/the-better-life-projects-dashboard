import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'
import Button from './ui/Button'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
          <div className="bg-white dark:bg-[#112217] rounded-xl p-8 border border-gray-200 dark:border-white/10 max-w-md w-full text-center">
            <AlertTriangle className="mx-auto mb-4 text-error" size={48} />
            <h1 className="text-gray-900 dark:text-white text-2xl font-bold mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-[#92c9a4] mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
            >
              Reload Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

