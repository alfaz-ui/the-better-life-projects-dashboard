import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useWellbeing } from '../context/WellbeingContext'
import { dataService } from '../services/dataService'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Moon, Sun, Download, Upload, Trash2, User, Bell } from 'lucide-react'
import SettingsIllustration from '../components/illustrations/SettingsIllustration'

const Settings = () => {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { entries, loadEntries } = useWellbeing()
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const data = await dataService.exportData()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `wellbeing-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Data exported successfully!')
    } catch (error) {
      toast.error('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      const text = await file.text()
      const result = await dataService.importData(text)
      await loadEntries()
      toast.success(`Imported ${result.count} entries successfully!`)
    } catch (error) {
      toast.error('Failed to import data. Please check the file format.')
    } finally {
      setIsImporting(false)
      event.target.value = '' // Reset file input
    }
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      // Clear IndexedDB
      const db = window.indexedDB.deleteDatabase('WellbeingDB')
      db.onsuccess = () => {
        toast.success('All data cleared')
        loadEntries()
      }
      db.onerror = () => {
        toast.error('Failed to clear data')
      }
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-[#92c9a4] text-base font-normal leading-normal">
            Manage your account and preferences
          </p>
        </div>
        <div className="hidden md:block w-40 h-32 opacity-60">
          <SettingsIllustration className="w-full h-full" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#23482f] rounded-lg">
              <User className="text-primary" size={24} />
            </div>
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                Name
              </label>
              <Input value={user?.name || ''} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <Input value={user?.email || ''} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                School
              </label>
              <Input value={user?.school || ''} disabled />
            </div>
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#23482f] rounded-lg">
              {isDark ? (
                <Moon className="text-primary" size={24} />
              ) : (
                <Sun className="text-primary" size={24} />
              )}
            </div>
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">Appearance</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white font-medium">Dark Mode</p>
              <p className="text-gray-600 dark:text-[#92c9a4] text-sm">Toggle dark/light theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className="relative w-14 h-8 bg-green-100 dark:bg-[#23482f] rounded-full transition-colors"
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-primary rounded-full"
                animate={{ x: isDark ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Data Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#23482f] rounded-lg">
              <Download className="text-primary" size={24} />
            </div>
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">Data Management</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1A2D22] rounded-lg hover:bg-green-50 dark:hover:bg-[#23482f] hover:border border-gray-200 dark:border-white/10 transition-all duration-200">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Export Data</p>
                <p className="text-gray-600 dark:text-[#92c9a4] text-sm">
                  Download all your entries as JSON
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={handleExport}
                disabled={isExporting || entries.length === 0}
              >
                <Download className="mr-2" size={16} />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1A2D22] rounded-lg hover:bg-green-50 dark:hover:bg-[#23482f] hover:border border-gray-200 dark:border-white/10 transition-all duration-200">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Import Data</p>
                <p className="text-gray-600 dark:text-[#92c9a4] text-sm">
                  Restore entries from a JSON file
                </p>
              </div>
              <label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  disabled={isImporting}
                />
                <Button
                  variant="secondary"
                  as="span"
                  disabled={isImporting}
                >
                  <Upload className="mr-2" size={16} />
                  {isImporting ? 'Importing...' : 'Import'}
                </Button>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1A2D22] rounded-lg border border-error/20">
              <div>
                <p className="text-gray-900 dark:text-white font-medium text-error">Clear All Data</p>
                <p className="text-gray-600 dark:text-[#92c9a4] text-sm">
                  Permanently delete all entries
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={handleClearData}
                className="border-error/50 hover:bg-error/10"
              >
                <Trash2 className="mr-2" size={16} />
                Clear
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings

