import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.string(),
  ORIGIN: z.string(),
  DATABASE_URL: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
