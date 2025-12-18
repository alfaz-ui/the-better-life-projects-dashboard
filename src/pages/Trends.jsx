import { useState, useMemo } from 'react'
import { useWellbeing } from '../context/WellbeingContext'
import { formatDateShort, getWeekRange, getMonthRange } from '../utils/dateUtils'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'
import TrendCard from '../components/charts/TrendCard'
import { motion } from 'framer-motion'
import { Calendar, Filter } from 'lucide-react'
import { METRICS } from '../utils/constants'
import TrendsIllustration from '../components/illustrations/TrendsIllustration'
import EmptyStateIllustration from '../components/illustrations/EmptyStateIllustration'
import SkeletonCard from '../components/ui/SkeletonCard'

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
        phase: entry.phase,
        allMetrics: entry.metrics || {},
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

  // Calculate previous period entries for trend comparison
  const previousPeriodEntries = useMemo(() => {
    if (!entries.length) return []

    let currentRange
    if (dateRange === 'week') {
      currentRange = getWeekRange()
      const weekAgo = new Date(currentRange.start.getTime() - 7 * 24 * 60 * 60 * 1000)
      const twoWeeksAgo = new Date(currentRange.start.getTime() - 14 * 24 * 60 * 60 * 1000)
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date)
        return entryDate >= twoWeeksAgo && entryDate < weekAgo
      })
    } else if (dateRange === 'month') {
      currentRange = getMonthRange()
      const monthAgo = new Date(currentRange.start)
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      const twoMonthsAgo = new Date(currentRange.start)
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date)
        return entryDate >= twoMonthsAgo && entryDate < monthAgo
      })
    } else {
      // For "all time", compare with first half vs second half
      const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date))
      const midpoint = Math.floor(sortedEntries.length / 2)
      return sortedEntries.slice(0, midpoint)
    }
  }, [entries, dateRange])

  // Calculate previous period averages
  const previousPeriodAverages = useMemo(() => {
    const metrics = Object.keys(METRICS)
    return metrics.reduce((acc, metricId) => {
      const values = previousPeriodEntries
        .map((entry) => entry.metrics?.[metricId])
        .filter((v) => typeof v === 'number')
      const avg = values.length
        ? values.reduce((sum, v) => sum + v, 0) / values.length
        : 0
      acc[metricId] = avg
      return acc
    }, {})
  }, [previousPeriodEntries])

  // Calculate trends for each metric
  const trends = useMemo(() => {
    const metrics = Object.keys(METRICS)
    return metrics.reduce((acc, metricId) => {
      const currentAvg = averageScores[metricId] || 0
      const previousAvg = previousPeriodAverages[metricId] || 0
      
      if (previousAvg === 0) {
        acc[metricId] = { trend: 0, trendValue: 0 }
      } else {
        const change = currentAvg - previousAvg
        const percentChange = (change / previousAvg) * 100
        acc[metricId] = {
          trend: change > 0 ? 1 : change < 0 ? -1 : 0,
          trendValue: Math.round(percentChange * 10) / 10
        }
      }
      return acc
    }, {})
  }, [averageScores, previousPeriodAverages])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-10 w-64 bg-gray-200 dark:bg-[#23482f] rounded animate-pulse mb-2"></div>
          <div className="h-6 w-96 bg-gray-200 dark:bg-[#23482f] rounded animate-pulse"></div>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="h-10 w-40 bg-gray-200 dark:bg-[#23482f] rounded animate-pulse"></div>
          <div className="h-10 w-40 bg-gray-200 dark:bg-[#23482f] rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10">
            <div className="h-6 w-32 bg-gray-200 dark:bg-[#23482f] rounded animate-pulse mb-4"></div>
            <div className="h-[300px] bg-gray-100 dark:bg-[#1A2D22] rounded animate-pulse"></div>
          </div>
          <div className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10">
            <div className="h-6 w-32 bg-gray-200 dark:bg-[#23482f] rounded animate-pulse mb-4"></div>
            <div className="h-[300px] bg-gray-100 dark:bg-[#1A2D22] rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
            Trends & Analytics
          </h1>
          <p className="text-gray-600 dark:text-[#92c9a4] text-base font-normal leading-normal">
            Track your wellbeing progress over time
          </p>
        </div>
        <div className="hidden md:block w-48 h-32 opacity-60">
          <TrendsIllustration className="w-full h-full" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 bg-white dark:bg-[#112217] rounded-lg p-2 border border-gray-200 dark:border-white/10">
          <Calendar className="text-gray-500 dark:text-white/60" size={20} />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent text-gray-900 dark:text-white border-none outline-none cursor-pointer"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-[#112217] rounded-lg p-2 border border-gray-200 dark:border-white/10">
          <Filter className="text-gray-500 dark:text-white/60" size={20} />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-transparent text-gray-900 dark:text-white border-none outline-none cursor-pointer"
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
            trend={trends[metric.id]?.trend || 0}
            trendValue={trends[metric.id]?.trendValue || 0}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-4">Line Chart</h2>
          {chartData.length > 0 ? (
            <LineChart data={chartData} dataKey={selectedMetric} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-600 dark:text-[#92c9a4]">
              <EmptyStateIllustration className="w-32 h-auto opacity-50 mb-4" />
              <p>No data available for selected period</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-4">Bar Chart</h2>
          {chartData.length > 0 ? (
            <BarChart data={chartData} dataKey={selectedMetric} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-600 dark:text-[#92c9a4]">
              <EmptyStateIllustration className="w-32 h-auto opacity-50 mb-4" />
              <p>No data available for selected period</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Trends

