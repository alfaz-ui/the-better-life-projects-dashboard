import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard,
  Edit,
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/daily-input', label: 'Daily Input', icon: Edit },
    { path: '/trends', label: 'Trends', icon: BarChart3 },
    { path: '/resources', label: 'Resources', icon: BookOpen },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    onMobileClose?.()
  }

  const sidebarContent = (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col gap-4">
        {user && (
          <div className="flex items-center gap-3 px-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
              style={{
                backgroundImage: user.avatar
                  ? `url("${user.avatar}")`
                  : 'none',
                backgroundColor: user.avatar ? 'transparent' : '#23482f',
              }}
            >
              {!user.avatar && (
                <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium">
                  {user.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <h1 className="text-white text-base font-medium leading-normal truncate">
                  {user.name || 'User'}
                </h1>
                <p className="text-[#92c9a4] text-sm font-normal leading-normal truncate">
                  {user.school || 'School'}
                </p>
              </div>
            )}
          </div>
        )}

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? 'bg-[#23482f] text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon
                  className={`shrink-0 ${active ? 'fill-current' : ''}`}
                  size={20}
                />
                {!isCollapsed && (
                  <p className="text-sm font-medium leading-normal">
                    {item.label}
                  </p>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <Link
          to="/settings"
          onClick={onMobileClose}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/settings')
              ? 'bg-[#23482f] text-white'
              : 'text-white/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="shrink-0" size={20} />
          {!isCollapsed && (
            <p className="text-sm font-medium leading-normal">Settings</p>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut className="shrink-0" size={20} />
          {!isCollapsed && (
            <p className="text-sm font-medium leading-normal">Log out</p>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-[#112217] p-4">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 flex-col border-r border-white/10 bg-[#112217] p-4 z-[60] md:hidden"
            >
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X size={24} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar

