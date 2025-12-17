import { format, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameWeek, isSameMonth } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'EEEE, d MMMM')
}

export const formatDateShort = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'MMM d, yyyy')
}

export const getWeekRange = (date = new Date()) => {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  }
}

export const getMonthRange = (date = new Date()) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  }
}

export const isInSameWeek = (date1, date2) => {
  return isSameWeek(date1, date2, { weekStartsOn: 1 })
}

export const isInSameMonth = (date1, date2) => {
  return isSameMonth(date1, date2)
}

