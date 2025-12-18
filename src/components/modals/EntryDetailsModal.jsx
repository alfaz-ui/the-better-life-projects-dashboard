import { motion, AnimatePresence } from 'framer-motion'
import { X, Edit2 } from 'lucide-react'
import { formatDate } from '../../utils/dateUtils'
import { METRICS } from '../../utils/constants'
import Button from '../ui/Button'
import ScoreRing from '../ui/ScoreRing'
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

const EntryDetailsModal = ({ entry, isOpen, onClose, onEdit }) => {
  if (!isOpen || !entry) return null

  const metrics = entry.metrics || {}
  const avgScore = Object.values(metrics).reduce((sum, val) => sum + (val || 0), 0) / Object.keys(metrics).length || 0

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
            <div className="bg-white dark:bg-[#112217] rounded-xl border border-gray-200 dark:border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-[#112217] border-b border-gray-200 dark:border-white/10 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900 dark:text-white text-2xl font-bold">
                    Entry Details
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
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <ScoreRing score={avgScore} size={80} strokeWidth={6} />
                    <p className="text-gray-600 dark:text-[#92c9a4] text-sm mt-2">Average Score</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1A2D22] rounded-lg">
                    <span className="text-gray-600 dark:text-[#92c9a4] text-sm">Phase</span>
                    <span className="text-gray-900 dark:text-white font-semibold capitalize">{entry.phase}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">Metrics</h3>
                  {Object.values(METRICS).map((metric) => {
                    const Icon = iconMap[metric.icon] || Users
                    const value = metrics[metric.id] || 0
                    return (
                      <div
                        key={metric.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1A2D22] rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-gray-900 dark:text-white flex items-center justify-center rounded-lg bg-green-100 dark:bg-[#23482f] shrink-0 size-10">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">{metric.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-[#23482f] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(value / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-gray-900 dark:text-white font-bold w-8 text-right">{value}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-white/10 mt-6">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  {onEdit && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        onEdit(entry)
                        onClose()
                      }}
                    >
                      <Edit2 size={18} className="mr-2" />
                      Edit Entry
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EntryDetailsModal

