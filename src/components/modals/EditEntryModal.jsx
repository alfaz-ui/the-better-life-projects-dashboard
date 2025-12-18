import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useWellbeing } from '../../context/WellbeingContext'
import { formatDate } from '../../utils/dateUtils'
import { PHASES, METRICS } from '../../utils/constants'
import TabButton from '../ui/TabButton'
import ProgressBar from '../ui/ProgressBar'
import MetricInput from '../ui/MetricInput'
import Button from '../ui/Button'
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

const EditEntryModal = ({ entry, isOpen, onClose, onSave }) => {
  const { saveEntry } = useWellbeing()
  const [activePhase, setActivePhase] = useState(entry?.phase || 'awareness')
  const [metrics, setMetrics] = useState(entry?.metrics || {
    relationalTone: 8,
    operationalReadiness: 6,
    boundaryPressure: 5,
    boundaryIntegrity: 7,
    agency: 8,
    clarity: 6,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (entry) {
      setActivePhase(entry.phase || 'awareness')
      setMetrics(entry.metrics || {
        relationalTone: 8,
        operationalReadiness: 6,
        boundaryPressure: 5,
        boundaryIntegrity: 7,
        agency: 8,
        clarity: 6,
      })
    }
  }, [entry])

  const handleMetricChange = (metricId, value) => {
    setMetrics((prev) => ({
      ...prev,
      [metricId]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updatedEntry = {
        ...entry,
        date: entry.date,
        phase: activePhase,
        metrics,
      }
      const result = await saveEntry(updatedEntry)
      if (result.success) {
        toast.success('Entry updated successfully!')
        onSave?.(result.data)
        onClose()
      } else {
        toast.error(result.error || 'Failed to update entry')
      }
    } catch (error) {
      toast.error('An error occurred while updating')
    } finally {
      setIsSaving(false)
    }
  }

  const totalQuestions = 6
  const answeredQuestions = Object.values(metrics).filter((v) => v !== null && v !== undefined).length
  const progress = (answeredQuestions / totalQuestions) * 100

  if (!isOpen || !entry) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-[#112217] rounded-xl border border-gray-200 dark:border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-[#112217] border-b border-gray-200 dark:border-white/10 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900 dark:text-white text-2xl font-bold">
                    Edit Entry
                  </h2>
                  <p className="text-gray-600 dark:text-[#92c9a4] text-sm mt-1">
                    {formatDate(entry.date)}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white p-2"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-8 flex gap-2 border-b border-gray-200 dark:border-white/10 overflow-x-auto">
                  {Object.values(PHASES).map((phase) => (
                    <TabButton
                      key={phase.id}
                      active={activePhase === phase.id}
                      onClick={() => setActivePhase(phase.id)}
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
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">Progress</p>
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
                      {Object.values(METRICS).map((metric) => {
                        const Icon = iconMap[metric.icon] || Users
                        return (
                          <div
                            key={metric.id}
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
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-white/10 mt-6">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EditEntryModal

