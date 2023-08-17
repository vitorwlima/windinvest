import { PrismaClient } from '@prisma/client'

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

export const prisma = new PrismaClient({ log: isProd ? [] : ['query'] })

