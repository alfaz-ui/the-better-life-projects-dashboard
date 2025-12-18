import { useState, useMemo } from 'react'
import { useWellbeing } from '../context/WellbeingContext'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../utils/dateUtils'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Activity, Plus, BarChart3, BookOpen, Edit2, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardIllustration from '../components/illustrations/DashboardIllustration'
import EmptyStateIllustration from '../components/illustrations/EmptyStateIllustration'
import SkeletonCard from '../components/ui/SkeletonCard'
import SkeletonList from '../components/ui/SkeletonList'
import TrendIndicator from '../components/ui/TrendIndicator'
import ScoreRing from '../components/ui/ScoreRing'
import EditEntryModal from '../components/modals/EditEntryModal'
import EntryDetailsModal from '../components/modals/EntryDetailsModal'
import SearchBar from '../components/ui/SearchBar'
import { toast } from 'sonner'

const Dashboard = () => {
  const { entries, loading, deleteEntry, loadEntries } = useWellbeing()
  const { user } = useAuth()
  const [editingEntry, setEditingEntry] = useState(null)
  const [viewingEntry, setViewingEntry] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecentEntries = useMemo(() => {
    let filtered = entries
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = entries.filter((entry) => {
        const dateStr = formatDate(entry.date).toLowerCase()
        const phaseStr = entry.phase?.toLowerCase() || ''
        const avgScore = Object.values(entry.metrics || {}).reduce((sum, val) => sum + (val || 0), 0) / Object.keys(entry.metrics || {}).length || 0
        const scoreStr = avgScore.toString()
        
        return dateStr.includes(query) || phaseStr.includes(query) || scoreStr.includes(query)
      })
    }
    
    return filtered.slice(0, 5)
  }, [entries, searchQuery])

  const recentEntries = filteredRecentEntries
  const totalEntries = entries.length
  const thisWeekEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date)
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return entryDate >= weekAgo
  }).length

  const averageScore = entries.length > 0
    ? Math.round(
        entries.reduce((sum, entry) => {
          const metrics = entry.metrics || {}
          const values = Object.values(metrics).filter((v) => typeof v === 'number')
          const avg = values.reduce((s, v) => s + v, 0) / values.length
          return sum + avg
        }, 0) / entries.length
      )
    : 0

  // Calculate trends (week over week)
  const calculateTrend = (currentValue, previousValue) => {
    if (!previousValue || previousValue === 0) return null
    return ((currentValue - previousValue) / previousValue) * 100
  }

  const lastWeekEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date)
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    return entryDate >= twoWeeksAgo && entryDate < weekAgo
  }).length

  const lastWeekAverage = entries
    .filter((entry) => {
      const entryDate = new Date(entry.date)
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
      return entryDate >= twoWeeksAgo && entryDate < weekAgo
    })
    .reduce((sum, entry) => {
      const metrics = entry.metrics || {}
      const values = Object.values(metrics).filter((v) => typeof v === 'number')
      const avg = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0
      return sum + avg
    }, 0) / (lastWeekEntries || 1)

  const entriesTrend = calculateTrend(thisWeekEntries, lastWeekEntries)
  const scoreTrend = calculateTrend(averageScore, lastWeekAverage)

  const handleEdit = (entry) => {
    setEditingEntry(entry)
    setIsEditModalOpen(true)
  }

  const handleDelete = async (entry) => {
    if (window.confirm(`Are you sure you want to delete the entry for ${formatDate(entry.date)}?`)) {
      const result = await deleteEntry(entry.id)
      if (result.success) {
        toast.success('Entry deleted successfully')
        loadEntries()
      } else {
        toast.error(result.error || 'Failed to delete entry')
      }
    }
  }

  const handleSaveEntry = () => {
    loadEntries()
    setIsEditModalOpen(false)
    setEditingEntry(null)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-[#92c9a4] text-base font-normal leading-normal">
            Here's your wellbeing overview
          </p>
        </div>
        <div className="hidden md:block w-48 h-32 opacity-60">
          <DashboardIllustration className="w-full h-full" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#23482f] rounded-lg">
                <Activity className="text-primary" size={24} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-2xl font-bold text-primary">{averageScore}</span>
                {scoreTrend !== null && <TrendIndicator value={scoreTrend} />}
              </div>
            </div>
            <h3 className="text-gray-900 dark:text-white font-medium mb-1">Average Score</h3>
            <p className="text-gray-600 dark:text-[#92c9a4] text-sm">Across all metrics</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#23482f] rounded-lg">
                <Calendar className="text-primary" size={24} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-2xl font-bold text-primary">{thisWeekEntries}</span>
                {entriesTrend !== null && <TrendIndicator value={entriesTrend} />}
              </div>
            </div>
            <h3 className="text-gray-900 dark:text-white font-medium mb-1">This Week</h3>
            <p className="text-gray-600 dark:text-[#92c9a4] text-sm">Entries logged</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#23482f] rounded-lg">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <span className="text-2xl font-bold text-primary">{totalEntries}</span>
            </div>
            <h3 className="text-gray-900 dark:text-white font-medium mb-1">Total Entries</h3>
            <p className="text-gray-600 dark:text-[#92c9a4] text-sm">All time</p>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold">Recent Entries</h2>
              <Link
                to="/daily-input"
                className="text-primary text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by date, phase, or score..."
            />
          </div>
          {loading ? (
            <SkeletonList count={5} />
          ) : recentEntries.length > 0 ? (
            <div className="space-y-3">
              {recentEntries.map((entry, index) => {
                const avgScore = Object.values(entry.metrics || {}).reduce((sum, val) => sum + (val || 0), 0) / Object.keys(entry.metrics || {}).length || 0
                return (
                  <motion.div
                    key={entry.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1A2D22] rounded-lg hover:bg-green-50 dark:hover:bg-[#23482f] hover:border border-gray-200 dark:border-white/10 transition-all duration-200 group"
                    onClick={() => {
                      setViewingEntry(entry)
                      setIsDetailsModalOpen(true)
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1 cursor-pointer">
                      <ScoreRing score={avgScore} size={36} strokeWidth={3} />
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium">
                          {formatDate(entry.date)}
                        </p>
                        <p className="text-gray-600 dark:text-[#92c9a4] text-sm capitalize">
                          {entry.phase}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-primary font-semibold text-lg">
                        {avgScore.toFixed(1)}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(entry)
                          }}
                          className="p-1.5 text-gray-600 dark:text-white/60 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors"
                          aria-label="Edit entry"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(entry)
                          }}
                          className="p-1.5 text-gray-600 dark:text-white/60 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors"
                          aria-label="Delete entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <EmptyStateIllustration className="w-40 h-auto opacity-60" />
              </motion.div>
              <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-2">No entries yet</h3>
              <p className="text-gray-600 dark:text-[#92c9a4] text-sm mb-6 max-w-sm mx-auto">
                Start tracking your wellbeing journey by logging your first entry. It only takes a few minutes!
              </p>
              <Link to="/daily-input">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center gap-2 mx-auto"
                >
                  <Plus size={18} />
                  <span>Create Your First Entry</span>
                </motion.button>
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4 flex flex-col">
            <Link to="/daily-input">
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 text-left flex items-center gap-3 shadow-lg shadow-primary/20"
              >
                <Plus size={20} />
                <span>Log Today's Entry</span>
              </motion.button>
            </Link>
            <Link to="/trends">
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-green-100 dark:bg-[#23482f] text-gray-900 dark:text-white font-medium rounded-lg hover:bg-green-200 dark:hover:bg-[#326744] transition-all duration-200 text-left flex items-center gap-3"
              >
                <BarChart3 size={20} />
                <span>View Trends</span>
              </motion.button>
            </Link>
            <Link to="/resources">
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-green-100 dark:bg-[#23482f] text-gray-900 dark:text-white font-medium rounded-lg hover:bg-green-200 dark:hover:bg-[#326744] transition-all duration-200 text-left flex items-center gap-3"
              >
                <BookOpen size={20} />
                <span>Browse Resources</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <EditEntryModal
        entry={editingEntry}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingEntry(null)
        }}
        onSave={handleSaveEntry}
      />

      <EntryDetailsModal
        entry={viewingEntry}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setViewingEntry(null)
        }}
        onEdit={(entry) => {
          setEditingEntry(entry)
          setIsEditModalOpen(true)
        }}
      />
    </div>
  )
}

export default Dashboard

