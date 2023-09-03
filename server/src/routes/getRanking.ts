import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'

export const getRanking = async (fastify: FastifyInstance) => {
  fastify.get('/ranking', async (request, reply) => {
    try {
      const greatestMarketValue = await prisma.asset.findMany({
        select: {
          ticker: true,
          fantasyName: true,
          fundamental: {
            select: {
              marketValue: true,
            },
          },
        },
        orderBy: {
          fundamental: {
            marketValue: 'desc',
          },
        },
        where: {
          fundamental: {
            marketValue: {
              not: null,
            },
          },
          ticker: {
            notIn: ['petr3', 'ambv4', 'itub3', 'abev3'],
          },
        },
        take: 5,
      })

      const greatestIncome = await prisma.asset.findMany({
        select: {
          ticker: true,
          fantasyName: true,
          fundamental: {
            select: {
              netIncome: true,
            },
          },
        },
        orderBy: {
          fundamental: {
            netIncome: 'desc',
          },
        },
        where: {
          fundamental: {
            netIncome: {
              not: null,
            },
          },
          ticker: {
            notIn: ['petr3', 'vale5'],
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
