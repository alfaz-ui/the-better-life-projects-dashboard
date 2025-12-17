const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-2 bg-transparent border border-white/10 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  )
}

export default Input

