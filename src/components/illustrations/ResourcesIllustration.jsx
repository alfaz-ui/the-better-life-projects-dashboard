const ResourcesIllustration = ({ className = '', primaryColor = '#92c9a4', secondaryColor = '#23482f' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Learning and resources illustration"
    >
      {/* Books */}
      <rect x="80" y="120" width="60" height="100" rx="4" fill={primaryColor} opacity="0.7" />
      <rect x="85" y="125" width="50" height="90" rx="2" fill={secondaryColor} opacity="0.5" />
      <line x1="110" y1="125" x2="110" y2="215" stroke={primaryColor} strokeWidth="2" opacity="0.6" />
      
      <rect x="160" y="110" width="60" height="110" rx="4" fill={primaryColor} opacity="0.8" />
      <rect x="165" y="115" width="50" height="100" rx="2" fill={secondaryColor} opacity="0.5" />
      <line x1="190" y1="115" x2="190" y2="215" stroke={primaryColor} strokeWidth="2" opacity="0.6" />
      
      <rect x="240" y="130" width="60" height="90" rx="4" fill={primaryColor} opacity="0.6" />
      <rect x="245" y="135" width="50" height="80" rx="2" fill={secondaryColor} opacity="0.5" />
      <line x1="270" y1="135" x2="270" y2="215" stroke={primaryColor} strokeWidth="2" opacity="0.6" />
      
      {/* Lightbulb */}
      <circle cx="200" cy="60" r="25" fill={primaryColor} opacity="0.3" />
      <path
        d="M 200 40 Q 190 30 180 40 Q 190 50 200 40"
        fill={primaryColor}
        opacity="0.6"
      />
      <rect x="195" y="50" width="10" height="15" rx="2" fill={primaryColor} opacity="0.8" />
      
      {/* Video play button */}
      <circle cx="100" cy="60" r="20" fill={secondaryColor} opacity="0.4" />
      <path
        d="M 92 55 L 92 65 L 102 60 Z"
        fill={primaryColor}
        opacity="0.8"
      />
      
      {/* Headphones */}
      <ellipse cx="300" cy="60" rx="25" ry="15" fill={secondaryColor} opacity="0.4" />
      <ellipse cx="300" cy="60" rx="15" ry="10" fill={primaryColor} opacity="0.6" />
      <rect x="290" y="60" width="20" height="8" rx="4" fill={primaryColor} opacity="0.5" />
      
      {/* Decorative elements */}
      <circle cx="50" cy="200" r="8" fill={primaryColor} opacity="0.4" />
      <circle cx="350" cy="200" r="8" fill={primaryColor} opacity="0.4" />
    </svg>
  )
}

export default ResourcesIllustration


