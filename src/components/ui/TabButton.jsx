import { motion } from 'framer-motion'

const TabButton = ({ active, onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 pb-3 pt-3 text-center border-b-2 transition-colors ${
        active
          ? 'border-primary'
          : 'border-transparent hover:border-white/50'
      } ${className}`}
    >
      <motion.span
        className={`text-sm font-medium block ${
          active ? 'text-primary' : 'text-white/60 group-hover:text-white'
        }`}
        animate={{ opacity: active ? 1 : 0.6 }}
      >
        {children}
      </motion.span>
    </button>
  )
}

export default TabButton

