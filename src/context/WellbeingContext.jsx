import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { dataService } from '../services/dataService'

const WellbeingContext = createContext()

export const useWellbeing = () => {
  const context = useContext(WellbeingContext)
  if (!context) {
    throw new Error('useWellbeing must be used within WellbeingProvider')
  }
  return context
}

export const WellbeingProvider = ({ children }) => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      setLoading(true)
      const data = await dataService.getAllEntries()
      setEntries(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error loading entries:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveEntry = async (entry) => {
    try {
      const saved = await dataService.saveEntry(entry)
      setEntries((prev) => {
        const existing = prev.findIndex((e) => e.id === saved.id)
        if (existing >= 0) {
          const updated = [...prev]
          updated[existing] = saved
          return updated
        }
        return [...prev, saved]
      })
      return { success: true, data: saved }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const deleteEntry = async (id) => {
    try {
      await dataService.deleteEntry(id)
      setEntries((prev) => prev.filter((e) => e.id !== id))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const getEntryByDate = useCallback((date) => {
    return entries.find((entry) => entry.date === date)
  }, [entries])

  const getEntriesByPhase = useCallback((phase) => {
    return entries.filter((entry) => entry.phase === phase)
  }, [entries])

  const getEntriesByDateRange = useCallback((startDate, endDate) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate >= startDate && entryDate <= endDate
    })
  }, [entries])

  const value = {
    entries,
    loading,
    error,
    saveEntry,
    deleteEntry,
    loadEntries,
    getEntryByDate,
    getEntriesByPhase,
    getEntriesByDateRange,
  }

  return (
    <WellbeingContext.Provider value={value}>
      {children}
    </WellbeingContext.Provider>
  )
}

