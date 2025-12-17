import { useState, useMemo } from 'react'
import { useWellbeing } from '../context/WellbeingContext'
import { formatDateShort, getWeekRange, getMonthRange } from '../utils/dateUtils'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'
import TrendCard from '../components/charts/TrendCard'
import { motion } from 'framer-motion'
import { Calendar, Filter } from 'lucide-react'
import { METRICS } from '../utils/constants'

const Trends = () => {
  const { entries, loading } = useWellbeing()
  const [dateRange, setDateRange] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('relationalTone')

  const filteredEntries = useMemo(() => {
    if (!entries.length) return []

    let range
    if (dateRange === 'week') {
      range = getWeekRange()
    } else if (dateRange === 'month') {
      range = getMonthRange()
    } else {
      // All time
      return entries
    }

    return entries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate >= range.start && entryDate <= range.end
    })
  }, [entries, dateRange])

  const chartData = useMemo(() => {
    return filteredEntries
      .map((entry) => ({
        date: formatDateShort(entry.date),
        [selectedMetric]: entry.metrics?.[selectedMetric] || 0,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [filteredEntries, selectedMetric])

  const averageScores = useMemo(() => {
    const metrics = Object.keys(METRICS)
    return metrics.reduce((acc, metricId) => {
      const values = filteredEntries
        .map((entry) => entry.metrics?.[metricId])
        .filter((v) => typeof v === 'number')
      const avg = values.length
        ? values.reduce((sum, v) => sum + v, 0) / values.length
        : 0
      acc[metricId] = Math.round(avg * 10) / 10
      return acc
    }, {})
  }, [filteredEntries])

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
          Trends & Analytics
        </h1>
        <p className="text-[#92c9a4] text-base font-normal leading-normal">
          Track your wellbeing progress over time
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 bg-[#112217] rounded-lg p-2 border border-white/10">
          <Calendar className="text-white/60" size={20} />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent text-white border-none outline-none cursor-pointer"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-[#112217] rounded-lg p-2 border border-white/10">
          <Filter className="text-white/60" size={20} />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-transparent text-white border-none outline-none cursor-pointer"
          >
            {Object.values(METRICS).map((metric) => (
              <option key={metric.id} value={metric.id}>
                {metric.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Object.values(METRICS).map((metric) => (
          <TrendCard
            key={metric.id}
            title={metric.name}
            value={averageScores[metric.id] || 0}
            trend={0}
            trendValue={0}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#112217] rounded-lg p-6 border border-white/10"
        >
          <h2 className="text-white text-xl font-bold mb-4">Line Chart</h2>
          {chartData.length > 0 ? (
            <LineChart data={chartData} dataKey={selectedMetric} />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-[#92c9a4]">
              No data available for selected period
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#112217] rounded-lg p-6 border border-white/10"
        >
          <h2 className="text-white text-xl font-bold mb-4">Bar Chart</h2>
          {chartData.length > 0 ? (
            <BarChart data={chartData} dataKey={selectedMetric} />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-[#92c9a4]">
              No data available for selected period
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Trends

