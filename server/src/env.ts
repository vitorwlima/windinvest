import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.string(),
})

export const ENV = envSchema.parse(process.env)
