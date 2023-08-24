import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string(),
})

export const ENV = envSchema.parse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
})
