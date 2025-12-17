import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { WellbeingProvider } from './context/WellbeingContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <WellbeingProvider>
              <AppRoutes />
              <Toaster position="top-right" richColors />
            </WellbeingProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App

