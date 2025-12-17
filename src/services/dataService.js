import Dexie from 'dexie'

// Initialize IndexedDB
const db = new Dexie('WellbeingDB')
db.version(1).stores({
  entries: '++id, date, phase, createdAt, updatedAt',
})

export const dataService = {
  async getAllEntries() {
    try {
      return await db.entries.orderBy('date').reverse().toArray()
    } catch (error) {
      console.error('Error fetching entries:', error)
      throw error
    }
  },

  async getEntry(id) {
    try {
      return await db.entries.get(id)
    } catch (error) {
      console.error('Error fetching entry:', error)
      throw error
    }
  },

  async getEntryByDate(date) {
    try {
      return await db.entries.where('date').equals(date).first()
    } catch (error) {
      console.error('Error fetching entry by date:', error)
      throw error
    }
  },

  async saveEntry(entry) {
    try {
      const now = new Date().toISOString()
      const existing = await this.getEntryByDate(entry.date)

      if (existing) {
        // Update existing entry
        const updated = {
          ...existing,
          ...entry,
          updatedAt: now,
        }
        await db.entries.update(existing.id, updated)
        return { ...updated, id: existing.id }
      } else {
        // Create new entry
        const newEntry = {
          ...entry,
          createdAt: now,
          updatedAt: now,
        }
        const id = await db.entries.add(newEntry)
        return { ...newEntry, id }
      }
    } catch (error) {
      console.error('Error saving entry:', error)
      throw error
    }
  },

  async deleteEntry(id) {
    try {
      await db.entries.delete(id)
    } catch (error) {
      console.error('Error deleting entry:', error)
      throw error
    }
  },

  async getEntriesByPhase(phase) {
    try {
      return await db.entries.where('phase').equals(phase).toArray()
    } catch (error) {
      console.error('Error fetching entries by phase:', error)
      throw error
    }
  },

  async getEntriesByDateRange(startDate, endDate) {
    try {
      return await db.entries
        .where('date')
        .between(startDate, endDate, true, true)
        .toArray()
    } catch (error) {
      console.error('Error fetching entries by date range:', error)
      throw error
    }
  },

  async exportData() {
    try {
      const entries = await this.getAllEntries()
      return JSON.stringify(entries, null, 2)
    } catch (error) {
      console.error('Error exporting data:', error)
      throw error
    }
  },

  async importData(jsonData) {
    try {
      const entries = JSON.parse(jsonData)
      await db.entries.bulkPut(entries)
      return { success: true, count: entries.length }
    } catch (error) {
      console.error('Error importing data:', error)
      throw error
    }
  },
}

