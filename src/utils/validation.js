import { z } from 'zod'

export const wellbeingEntrySchema = z.object({
  phase: z.enum(['awareness', 'clarity', 'strength', 'ownership']),
  date: z.string(),
  metrics: z.object({
    relationalTone: z.number().min(0).max(10),
    operationalReadiness: z.number().min(0).max(10),
    boundaryPressure: z.number().min(0).max(10),
    boundaryIntegrity: z.number().min(0).max(10),
    agency: z.number().min(0).max(10),
    clarity: z.number().min(0).max(10),
  }),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

