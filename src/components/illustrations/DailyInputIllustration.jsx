const DailyInputIllustration = ({ className = '', primaryColor = '#92c9a4', secondaryColor = '#23482f' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Journaling and reflection illustration"
    >
      {/* Journal/Notebook */}
      <rect x="150" y="80" width="100" height="140" rx="4" fill={secondaryColor} opacity="0.4" />
      <rect x="150" y="80" width="100" height="140" rx="4" stroke={primaryColor} strokeWidth="2" fill="none" />
      
      {/* Spiral binding */}
      <line x1="200" y1="80" x2="200" y2="220" stroke={primaryColor} strokeWidth="3" opacity="0.6" />
      
      {/* Lines on paper */}
      <line x1="160" y1="110" x2="190" y2="110" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" />
      <line x1="160" y1="130" x2="190" y2="130" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" />
      <line x1="160" y1="150" x2="190" y2="150" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" />
      <line x1="160" y1="170" x2="185" y2="170" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" />
      
      {/* Pen */}
      <rect x="260" y="100" width="8" height="40" rx="2" fill={primaryColor} />
      <path
        d="M 264 100 L 268 95 L 272 100 Z"
        fill={primaryColor}
      />
      
      {/* Thought bubbles */}
      <circle cx="100" cy="100" r="25" fill={secondaryColor} opacity="0.3" />
      <circle cx="100" cy="100" r="15" fill={primaryColor} opacity="0.4" />
      
      <circle cx="300" cy="120" r="20" fill={secondaryColor} opacity="0.3" />
      <circle cx="300" cy="120" r="12" fill={primaryColor} opacity="0.4" />
      
      {/* Reflection elements - light rays */}
      <path
        d="M 200 60 L 180 40 M 200 60 L 220 40"
        stroke={primaryColor}
        strokeWidth="2"
        opacity="0.4"
        strokeLinecap="round"
      />
      
      {/* Calendar/Date indicator */}
      <rect x="120" y="200" width="50" height="40" rx="4" fill={secondaryColor} opacity="0.5" />
      <text
        x="145"
        y="225"
        textAnchor="middle"
        fill={primaryColor}
        fontSize="16"
        fontWeight="bold"
        opacity="0.8"
      >
        17
      </text>
    </svg>
  )
}

export default DailyInputIllustration


