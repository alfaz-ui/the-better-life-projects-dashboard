import { useWellbeing } from '../context/WellbeingContext'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../utils/dateUtils'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { entries, loading } = useWellbeing()
  const { user } = useAuth()

  const recentEntries = entries.slice(0, 5)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-[#92c9a4] text-base font-normal leading-normal">
          Here's your wellbeing overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#112217] rounded-lg p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#23482f] rounded-lg">
              <Activity className="text-primary" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary">{averageScore}</span>
          </div>
          <h3 className="text-white font-medium mb-1">Average Score</h3>
          <p className="text-[#92c9a4] text-sm">Across all metrics</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#112217] rounded-lg p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#23482f] rounded-lg">
              <Calendar className="text-primary" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary">{thisWeekEntries}</span>
          </div>
          <h3 className="text-white font-medium mb-1">This Week</h3>
          <p className="text-[#92c9a4] text-sm">Entries logged</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#112217] rounded-lg p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#23482f] rounded-lg">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary">{totalEntries}</span>
          </div>
          <h3 className="text-white font-medium mb-1">Total Entries</h3>
          <p className="text-[#92c9a4] text-sm">All time</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#112217] rounded-lg p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl font-bold">Recent Entries</h2>
            <Link
              to="/daily-input"
              className="text-primary text-sm font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          {recentEntries.length > 0 ? (
            <div className="space-y-3">
              {recentEntries.map((entry, index) => (
                <motion.div
                  key={entry.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-[#1A2D22] rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">
                      {formatDate(entry.date)}
                    </p>
                    <p className="text-[#92c9a4] text-sm capitalize">
                      {entry.phase}
                    </p>
                  </div>
                  <div className="text-primary font-semibold">
                    {Object.values(entry.metrics || {}).reduce((sum, val) => sum + (val || 0), 0) / Object.keys(entry.metrics || {}).length || 0}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#92c9a4] mb-4">No entries yet</p>
              <Link to="/daily-input">
                <button className="px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                  Create Your First Entry
                </button>
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#112217] rounded-lg p-6 border border-white/10"
        >
          <h2 className="text-white text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/daily-input">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors text-left"
              >
                Log Today's Entry
              </motion.button>
            </Link>
            <Link to="/trends">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-[#23482f] text-white font-medium rounded-lg hover:bg-[#326744] transition-colors text-left"
              >
                View Trends
              </motion.button>
            </Link>
            <Link to="/resources">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-[#23482f] text-white font-medium rounded-lg hover:bg-[#326744] transition-colors text-left"
              >
                Browse Resources
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

