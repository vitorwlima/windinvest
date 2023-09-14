import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'

export const getRanking = async (fastify: FastifyInstance) => {
  fastify.get('/ranking', async (request, reply) => {
    try {
      const greatestMarketValue = await prisma.asset.findMany({
        select: {
          ticker: true,
          fantasyName: true,
          marketValue: true,
        },
        orderBy: {
          marketValue: 'desc',
        },
        where: {
          marketValue: {
            not: null,
          },
          ticker: {
            notIn: ['PETR3', 'ITUB3'],
          },
        },
        take: 5,
      })

      const greatestIncome = await prisma.asset.findMany({
        select: {
          ticker: true,
          fantasyName: true,
          netIncome: true,
        },
        orderBy: {
          netIncome: 'desc',
        },
        where: {
          netIncome: {
            not: null,
          },
          ticker: {
            notIn: ['PETR3'],
          },
        },
        take: 5,
      })

      const rankings = {
        greatestMarketValue,
        greatestIncome,
      }

      reply.code(200)
      return { ok: true, data: rankings }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
