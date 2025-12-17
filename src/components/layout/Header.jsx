import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#112217] border-b border-white/10 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-white text-lg font-bold">Wellbeing Dashboard</h1>
        <motion.button
          onClick={onMenuClick}
          className="text-white/80 hover:text-white p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={24} />
        </motion.button>
      </div>
    </header>
  )
}

export default Header

