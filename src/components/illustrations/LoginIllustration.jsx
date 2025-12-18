const LoginIllustration = ({ className = '', primaryColor = '#92c9a4', secondaryColor = '#23482f' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Wellness and meditation illustration"
    >
      {/* Person meditating */}
      <circle cx="200" cy="120" r="40" fill={primaryColor} opacity="0.2" />
      <circle cx="200" cy="120" r="30" fill={primaryColor} opacity="0.3" />
      
      {/* Head */}
      <circle cx="200" cy="100" r="25" fill={primaryColor} />
      
      {/* Body */}
      <ellipse cx="200" cy="160" rx="20" ry="35" fill={primaryColor} />
      
      {/* Arms in meditation pose */}
      <ellipse cx="175" cy="150" rx="8" ry="25" fill={primaryColor} transform="rotate(-20 175 150)" />
      <ellipse cx="225" cy="150" rx="8" ry="25" fill={primaryColor} transform="rotate(20 225 150)" />
      
      {/* Legs */}
      <ellipse cx="190" cy="200" rx="8" ry="30" fill={primaryColor} transform="rotate(-10 190 200)" />
      <ellipse cx="210" cy="200" rx="8" ry="30" fill={primaryColor} transform="rotate(10 210 200)" />
      
      {/* Decorative elements - leaves/wellness symbols */}
      <path
        d="M 100 150 Q 110 140 120 150 Q 110 160 100 150"
        fill={secondaryColor}
        opacity="0.6"
      />
      <path
        d="M 280 150 Q 290 140 300 150 Q 290 160 280 150"
        fill={secondaryColor}
        opacity="0.6"
      />
      <path
        d="M 150 80 Q 160 70 170 80 Q 160 90 150 80"
        fill={secondaryColor}
        opacity="0.5"
      />
      <path
        d="M 230 80 Q 240 70 250 80 Q 240 90 230 80"
        fill={secondaryColor}
        opacity="0.5"
      />
      
      {/* Peaceful waves/energy */}
      <path
        d="M 50 200 Q 100 190 150 200 Q 200 210 250 200 Q 300 190 350 200"
        stroke={primaryColor}
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 50 220 Q 100 210 150 220 Q 200 230 250 220 Q 300 210 350 220"
        stroke={primaryColor}
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
    </svg>
  )
}

export default LoginIllustration


