const TrendsIllustration = ({ className = '', primaryColor = '#92c9a4', secondaryColor = '#23482f' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Analytics and trends illustration"
    >
      {/* Chart background */}
      <rect x="50" y="50" width="300" height="200" rx="8" fill={secondaryColor} opacity="0.2" />
      
      {/* Grid lines */}
      <line x1="50" y1="100" x2="350" y2="100" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
      <line x1="50" y1="150" x2="350" y2="150" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
      <line x1="50" y1="200" x2="350" y2="200" stroke={primaryColor} strokeWidth="1" opacity="0.2" />
      
      {/* Line chart */}
      <path
        d="M 80 200 L 120 180 L 160 160 L 200 140 L 240 150 L 280 130 L 320 120"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Data points */}
      <circle cx="80" cy="200" r="4" fill={primaryColor} />
      <circle cx="120" cy="180" r="4" fill={primaryColor} />
      <circle cx="160" cy="160" r="4" fill={primaryColor} />
      <circle cx="200" cy="140" r="4" fill={primaryColor} />
      <circle cx="240" cy="150" r="4" fill={primaryColor} />
      <circle cx="280" cy="130" r="4" fill={primaryColor} />
      <circle cx="320" cy="120" r="4" fill={primaryColor} />
      
      {/* Trend arrow */}
      <path
        d="M 320 120 L 360 100 M 350 95 L 360 100 L 350 105"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      
      {/* Analytics icons */}
      <rect x="70" y="230" width="40" height="40" rx="4" fill={secondaryColor} opacity="0.3" />
      <circle cx="90" cy="250" r="8" fill={primaryColor} opacity="0.6" />
      
      <rect x="170" y="230" width="40" height="40" rx="4" fill={secondaryColor} opacity="0.3" />
      <path
        d="M 185 240 L 195 250 L 210 235"
        stroke={primaryColor}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      
      <rect x="270" y="230" width="40" height="40" rx="4" fill={secondaryColor} opacity="0.3" />
      <rect x="280" y="240" width="20" height="20" rx="2" fill={primaryColor} opacity="0.6" />
    </svg>
  )
}

export default TrendsIllustration


