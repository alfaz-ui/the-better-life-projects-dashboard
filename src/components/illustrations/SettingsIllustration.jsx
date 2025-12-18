const SettingsIllustration = ({ className = '', primaryColor = '#92c9a4', secondaryColor = '#23482f' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Settings and configuration illustration"
    >
      {/* Gear/Settings icon */}
      <circle cx="200" cy="150" r="60" fill="none" stroke={primaryColor} strokeWidth="4" opacity="0.3" />
      <circle cx="200" cy="150" r="40" fill={secondaryColor} opacity="0.4" />
      
      {/* Gear teeth */}
      <rect x="195" y="90" width="10" height="20" rx="2" fill={primaryColor} />
      <rect x="195" y="190" width="10" height="20" rx="2" fill={primaryColor} />
      <rect x="90" y="145" width="20" height="10" rx="2" fill={primaryColor} />
      <rect x="290" y="145" width="20" height="10" rx="2" fill={primaryColor} />
      
      <rect x="195" y="110" width="10" height="15" rx="2" fill={primaryColor} opacity="0.7" transform="rotate(45 200 150)" />
      <rect x="195" y="110" width="10" height="15" rx="2" fill={primaryColor} opacity="0.7" transform="rotate(-45 200 150)" />
      <rect x="195" y="110" width="10" height="15" rx="2" fill={primaryColor} opacity="0.7" transform="rotate(135 200 150)" />
      <rect x="195" y="110" width="10" height="15" rx="2" fill={primaryColor} opacity="0.7" transform="rotate(-135 200 150)" />
      
      {/* Center circle */}
      <circle cx="200" cy="150" r="15" fill={primaryColor} />
      
      {/* Sliders/Controls */}
      <rect x="80" y="80" width="60" height="8" rx="4" fill={secondaryColor} opacity="0.5" />
      <circle cx="110" cy="84" r="10" fill={primaryColor} />
      
      <rect x="260" y="80" width="60" height="8" rx="4" fill={secondaryColor} opacity="0.5" />
      <circle cx="290" cy="84" r="10" fill={primaryColor} />
      
      <rect x="80" y="220" width="60" height="8" rx="4" fill={secondaryColor} opacity="0.5" />
      <circle cx="110" cy="224" r="10" fill={primaryColor} />
      
      <rect x="260" y="220" width="60" height="8" rx="4" fill={secondaryColor} opacity="0.5" />
      <circle cx="290" cy="224" r="10" fill={primaryColor} />
    </svg>
  )
}

export default SettingsIllustration


