import { useState, useEffect, useCallback } from 'react'
import { useWellbeing } from '../context/WellbeingContext'
import { formatDate } from '../utils/dateUtils'
import { PHASES, METRICS } from '../utils/constants'
import TabButton from '../components/ui/TabButton'
import ProgressBar from '../components/ui/ProgressBar'
import MetricInput from '../components/ui/MetricInput'
import Button from '../components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Users,
  CheckCircle2,
  Minimize2,
  Shield,
  Hand,
  Lightbulb,
  Check,
  Save,
} from 'lucide-react'
import DailyInputIllustration from '../components/illustrations/DailyInputIllustration'

const iconMap = {
  groups: Users,
  task_alt: CheckCircle2,
  compress: Minimize2,
  shield: Shield,
  pan_tool: Hand,
  lightbulb: Lightbulb,
}

const DailyInput = () => {
  const { saveEntry, getEntryByDate } = useWellbeing()
  const [activePhase, setActivePhase] = useState('awareness')
  const [metrics, setMetrics] = useState({
    relationalTone: 8,
    operationalReadiness: 6,
    boundaryPressure: 5,
    boundaryIntegrity: 7,
    agency: 8,
    clarity: 6,
  })
  const [currentDate] = useState(new Date().toISOString().split('T')[0])
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAutoSaving, setIsAutoSaving] = useState(false)

  // Load existing entry for today
  useEffect(() => {
    const existing = getEntryByDate(currentDate)
    if (existing) {
      setMetrics(existing.metrics || metrics)
      setActivePhase(existing.phase || 'awareness')
    }
  }, [currentDate, getEntryByDate])

  // Auto-save with debounce
  useEffect(() => {
    if (!hasUnsavedChanges) return

    setIsAutoSaving(true)
    const timer = setTimeout(async () => {
      await handleSave(true) // Silent save
      setIsAutoSaving(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      setIsAutoSaving(false)
    }
  }, [metrics, activePhase, hasUnsavedChanges])

  const handleMetricChange = useCallback((metricId, value) => {
    setMetrics((prev) => ({
      ...prev,
      [metricId]: value,
    }))
    setHasUnsavedChanges(true)
  }, [])

  const handleSave = async (silent = false) => {
    setIsSaving(true)
    try {
      const entry = {
        date: currentDate,
        phase: activePhase,
        metrics,
      }
      const result = await saveEntry(entry)
      if (result.success) {
        setHasUnsavedChanges(false)
        if (!silent) {
          setShowSuccess(true)
          toast.success('Entry saved successfully!', {
            icon: '✓',
            duration: 2000,
          })
          setTimeout(() => setShowSuccess(false), 2000)
        }
      } else {
        toast.error(result.error || 'Failed to save entry', {
          icon: '✕',
        })
      }
    } catch (error) {
      toast.error('An error occurred while saving', {
        icon: '✕',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    const existing = getEntryByDate(currentDate)
    if (existing) {
      setMetrics(existing.metrics || metrics)
      setActivePhase(existing.phase || 'awareness')
    } else {
      setMetrics({
        relationalTone: 8,
        operationalReadiness: 6,
        boundaryPressure: 5,
        boundaryIntegrity: 7,
        agency: 8,
        clarity: 6,
      })
    }
    setHasUnsavedChanges(false)
  }

  const totalQuestions = 6
  const answeredQuestions = Object.values(metrics).filter((v) => v !== null && v !== undefined).length
  const progress = (answeredQuestions / totalQuestions) * 100

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Wellbeing Data Input
          </h1>
          <p className="text-gray-600 dark:text-[#92c9a4] text-base font-normal leading-normal">
            Take a moment to reflect on your day. Entry for: {formatDate(currentDate)}.
          </p>
        </div>
        <div className="hidden md:block w-40 h-32 opacity-60">
          <DailyInputIllustration className="w-full h-full" />
        </div>
      </div>

      <div className="mb-8 flex gap-2 border-b border-gray-200 dark:border-white/10 overflow-x-auto">
        {Object.values(PHASES).map((phase) => (
          <TabButton
            key={phase.id}
            active={activePhase === phase.id}
            onClick={() => {
              setActivePhase(phase.id)
              setHasUnsavedChanges(true)
            }}
          >
            <span className="text-sm font-medium">
              {phase.name}
            </span>
            <span className="block text-xs text-gray-500 dark:text-white/60 mt-1">
              (Weeks {phase.weeks})
            </span>
          </TabButton>
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <div className="flex items-center justify-between">
          <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">Progress</p>
          <div className="md:hidden w-20 h-16 opacity-50">
            <DailyInputIllustration className="w-full h-full" />
          </div>
        </div>
        <ProgressBar progress={progress} />
        <p className="text-gray-600 dark:text-[#92c9a4] text-sm font-normal leading-normal">
          Question {answeredQuestions} of {totalQuestions}
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-gray-200 dark:border-white/10">
            Weekly Observation
          </h2>
          <div className="mt-6 space-y-4">
            <AnimatePresence>
              {Object.values(METRICS).map((metric, index) => {
                const Icon = iconMap[metric.icon] || Users
                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-transparent px-4 py-2 min-h-14 justify-between border border-transparent hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-[#1A2D22] hover:shadow-md hover:shadow-primary/10 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="text-gray-900 dark:text-white flex items-center justify-center rounded-lg bg-green-100 dark:bg-[#23482f] shrink-0 size-10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-gray-900 dark:text-white text-base font-normal leading-normal flex-1 truncate">
                        {metric.name}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <MetricInput
                        value={metrics[metric.id]}
                        onChange={(value) => handleMetricChange(metric.id, value)}
                        min={0}
                        max={10}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          {isAutoSaving && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 text-gray-600 dark:text-[#92c9a4] text-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
              />
              <span>Auto-saving...</span>
            </motion.div>
          )}
          {!isAutoSaving && !hasUnsavedChanges && !isSaving && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-primary text-sm"
            >
              <CheckCircle2 size={16} />
              <span>All changes saved</span>
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleCancel}
            disabled={isSaving || !hasUnsavedChanges}
          >
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="primary"
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {showSuccess ? (
                  <motion.span
                    key="success"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={18} />
                    <span>Saved!</span>
                  </motion.span>
                ) : isSaving ? (
                  <motion.span
                    key="saving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                    <span>Saving...</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="save"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Save size={18} />
                    <span>Save This Week's Entry</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DailyInput

