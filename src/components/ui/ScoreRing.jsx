const ScoreRing = ({ score, maxScore = 10, size = 40, strokeWidth = 4 }) => {
  const percentage = (score / maxScore) * 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  // Color based on score
  const getColor = () => {
    if (percentage >= 70) return '#13ec5b' // primary green
    if (percentage >= 50) return '#fbbf24' // warning yellow
    return '#ef4444' // error red
  }

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-300 dark:text-white/10"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-900 dark:text-white">
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  )
}

export default ScoreRing


