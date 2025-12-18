import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const MetricInput = ({
  value,
  onChange,
  min = 0,
  max = 10,
  disabled = false,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value || 0)

  // Sync with external value changes
  useEffect(() => {
    if (value !== undefined && value !== localValue) {
      setLocalValue(value)
    }
  }, [value])

  const handleDecrement = () => {
    if (localValue > min && !disabled) {
      const newValue = localValue - 1
      setLocalValue(newValue)
      onChange?.(newValue)
    }
  }

  const handleIncrement = () => {
    if (localValue < max && !disabled) {
      const newValue = localValue + 1
      setLocalValue(newValue)
      onChange?.(newValue)
    }
  }

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || min
    const clampedValue = Math.min(Math.max(newValue, min), max)
    setLocalValue(clampedValue)
    onChange?.(clampedValue)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || localValue <= min}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 dark:bg-[#23482f] hover:bg-green-200 dark:hover:bg-[#326744] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: disabled || localValue <= min ? 1 : 1.1 }}
        whileTap={{ scale: disabled || localValue <= min ? 1 : 0.9 }}
      >
        <Minus className="h-4 w-4 text-gray-700 dark:text-white" />
      </motion.button>
      <input
        type="number"
        value={localValue}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className="text-base font-medium leading-normal w-6 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <motion.button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || localValue >= max}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 dark:bg-[#23482f] hover:bg-green-200 dark:hover:bg-[#326744] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: disabled || localValue >= max ? 1 : 1.1 }}
        whileTap={{ scale: disabled || localValue >= max ? 1 : 0.9 }}
      >
        <Plus className="h-4 w-4 text-gray-700 dark:text-white" />
      </motion.button>
    </div>
  )
}

export default MetricInput

