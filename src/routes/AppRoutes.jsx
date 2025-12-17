import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import Layout from '../components/layout/Layout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import DailyInput from '../pages/DailyInput'
import Trends from '../pages/Trends'
import Resources from '../pages/Resources'
import Settings from '../pages/Settings'

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="daily-input" element={<DailyInput />} />
        <Route path="trends" element={<Trends />} />
        <Route path="resources" element={<Resources />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes

