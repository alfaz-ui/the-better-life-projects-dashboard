import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const TrendCard = ({ title, value, trend, trendValue, icon: Icon }) => {
  const getTrendIcon = () => {
    if (trend > 0) return <TrendingUp className="text-success" size={16} />
    if (trend < 0) return <TrendingDown className="text-error" size={16} />
    return <Minus className="text-white/60" size={16} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#112217] rounded-lg p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className="p-3 bg-[#23482f] rounded-lg">
            <Icon className="text-primary" size={24} />
          </div>
        )}
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${
            trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-white/60'
          }`}>
            {trendValue > 0 ? '+' : ''}{trendValue}%
          </span>
        </div>
      </div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </motion.div>
  )
}

export default TrendCard

