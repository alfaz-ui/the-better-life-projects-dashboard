const EmptyStateIllustration = ({ className = '', primaryColor = '#92c9a4', secondaryColor = '#23482f' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Empty state illustration"
    >
      {/* Empty box/container */}
      <rect x="80" y="60" width="140" height="100" rx="8" fill={secondaryColor} opacity="0.3" stroke={primaryColor} strokeWidth="2" strokeDasharray="5,5" />
      
      {/* Question mark or plus */}
      <circle cx="150" cy="110" r="25" fill="none" stroke={primaryColor} strokeWidth="2" opacity="0.5" />
      <text
        x="150"
        y="120"
        textAnchor="middle"
        fill={primaryColor}
        fontSize="32"
        fontWeight="bold"
        opacity="0.6"
      >
        ?
      </text>
      
      {/* Decorative dots */}
      <circle cx="100" cy="50" r="4" fill={primaryColor} opacity="0.4" />
      <circle cx="200" cy="50" r="4" fill={primaryColor} opacity="0.4" />
      <circle cx="100" cy="170" r="4" fill={primaryColor} opacity="0.4" />
      <circle cx="200" cy="170" r="4" fill={primaryColor} opacity="0.4" />
    </svg>
  )
}

export default EmptyStateIllustration


