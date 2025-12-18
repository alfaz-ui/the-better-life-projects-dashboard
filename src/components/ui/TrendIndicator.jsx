import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const TrendIndicator = ({ value, showLabel = false }) => {
  if (value === null || value === undefined || isNaN(value)) {
    return null
  }

  const isPositive = value > 0
  const isNegative = value < 0
  const isNeutral = value === 0

  const colorClass = isPositive
    ? 'text-primary'
    : isNegative
    ? 'text-red-400'
    : 'text-gray-500 dark:text-white/60'

  const Icon = isPositive
    ? TrendingUp
    : isNegative
    ? TrendingDown
    : Minus

  return (
    <div className={`flex items-center gap-1 ${colorClass}`}>
      <Icon size={14} />
      <span className="text-xs font-medium">
        {isPositive ? '+' : ''}
        {value.toFixed(1)}%
      </span>
      {showLabel && (
        <span className="text-xs text-gray-500 dark:text-white/60 ml-1">
          {isPositive ? 'increase' : isNegative ? 'decrease' : 'no change'}
        </span>
      )}
    </div>
  )
}

export default TrendIndicator


