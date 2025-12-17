import { motion } from 'framer-motion'

const ProgressBar = ({ progress = 0, className = '' }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-full bg-[#326744] h-2 overflow-hidden">
        <motion.div
          className="h-2 rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default ProgressBar

