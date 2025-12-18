const DashboardIllustration = ({ className = '', primaryColor = '#92c9a4', secondaryColor = '#23482f' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dashboard overview illustration"
    >
      {/* Chart/Graph representation */}
      <rect x="50" y="200" width="300" height="80" rx="8" fill={secondaryColor} opacity="0.3" />
      
      {/* Bar chart bars */}
      <rect x="70" y="180" width="30" height="100" rx="4" fill={primaryColor} opacity="0.7" />
      <rect x="120" y="160" width="30" height="120" rx="4" fill={primaryColor} opacity="0.8" />
      <rect x="170" y="150" width="30" height="130" rx="4" fill={primaryColor} />
      <rect x="220" y="165" width="30" height="115" rx="4" fill={primaryColor} opacity="0.9" />
      <rect x="270" y="175" width="30" height="105" rx="4" fill={primaryColor} opacity="0.7" />
      <rect x="320" y="170" width="30" height="110" rx="4" fill={primaryColor} opacity="0.8" />
      
      {/* Person with growth arrow */}
      <circle cx="200" cy="80" r="30" fill={primaryColor} opacity="0.2" />
      <circle cx="200" cy="80" r="20" fill={primaryColor} />
      
      {/* Growth arrow */}
      <path
        d="M 200 50 L 200 30 M 190 40 L 200 30 L 210 40"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Decorative elements - progress indicators */}
      <circle cx="100" cy="60" r="15" fill={secondaryColor} opacity="0.4" />
      <circle cx="100" cy="60" r="8" fill={primaryColor} opacity="0.6" />
      
      <circle cx="300" cy="60" r="15" fill={secondaryColor} opacity="0.4" />
      <circle cx="300" cy="60" r="8" fill={primaryColor} opacity="0.6" />
      
      {/* Success checkmarks */}
      <path
        d="M 80 100 L 90 110 L 110 90"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M 310 100 L 320 110 L 340 90"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  )
}

export default DashboardIllustration


