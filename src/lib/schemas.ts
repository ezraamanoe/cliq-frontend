import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  avatar: z.string().url().optional().or(z.literal('')),
})

export const reservePassSchema = z.object({
  attendees: z.coerce.number().min(1).max(10),
})
