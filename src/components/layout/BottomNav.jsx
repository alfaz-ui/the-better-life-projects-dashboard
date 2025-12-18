import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Edit, BarChart3, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const BottomNav = () => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/daily-input', icon: Edit, label: 'Input' },
    { path: '/trends', icon: BarChart3, label: 'Trends' },
    { path: '/resources', icon: BookOpen, label: 'Resources' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#112217] border-t border-gray-200 dark:border-white/10 md:hidden z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 right-0 h-1 bg-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`${active ? 'text-primary' : 'text-gray-500 dark:text-white/60'}`}
                size={24}
              />
              <span
                className={`text-xs mt-1 ${active ? 'text-primary' : 'text-gray-500 dark:text-white/60'}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav

