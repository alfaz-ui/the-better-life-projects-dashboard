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
} from 'lucide-react'

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

    const timer = setTimeout(async () => {
      await handleSave(true) // Silent save
    }, 2000)

    return () => clearTimeout(timer)
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
          toast.success('Entry saved successfully!')
        }
      } else {
        toast.error(result.error || 'Failed to save entry')
      }
    } catch (error) {
      toast.error('An error occurred while saving')
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
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Wellbeing Data Input
          </h1>
          <p className="text-[#92c9a4] text-base font-normal leading-normal">
            Take a moment to reflect on your day. Entry for: {formatDate(currentDate)}.
          </p>
        </div>
      </div>

      <div className="mb-8 flex gap-2 border-b border-white/10 overflow-x-auto">
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
            <span className="block text-xs text-white/60 mt-1">
              (Weeks {phase.weeks})
            </span>
          </TabButton>
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <p className="text-white text-base font-medium leading-normal">Progress</p>
        <ProgressBar progress={progress} />
        <p className="text-[#92c9a4] text-sm font-normal leading-normal">
          Question {answeredQuestions} of {totalQuestions}
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-white/10">
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
                    className="flex items-center gap-4 bg-transparent px-4 py-2 min-h-14 justify-between border border-transparent hover:border-white/10 hover:bg-[#1A2D22] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="text-white flex items-center justify-center rounded-lg bg-[#23482f] shrink-0 size-10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-white text-base font-normal leading-normal flex-1 truncate">
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

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
        <Button
          variant="ghost"
          onClick={handleCancel}
          disabled={isSaving || !hasUnsavedChanges}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSave(false)}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : "Save This Week's Entry"}
        </Button>
      </div>
    </div>
  )
}

export default DailyInput

