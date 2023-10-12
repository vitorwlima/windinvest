import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { prisma } from 'src/lib/prisma'

export const getRanking = async (fastify: FastifyInstance) => {
  fastify.get('/ranking', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    try {
      const greatestMarketValue = await prisma.asset.findMany({
        select: {
          ticker: true,
          company: {
            select: {
              fantasyName: true,
              marketValue: true,
            },
          },
        },
        orderBy: {
          company: {
            marketValue: 'desc',
          },
        },
        where: {
          company: {
            marketValue: {
              not: null,
            },
          },
        },
        take: 5,
      })

      const greatestEnterpriseValue = await prisma.asset.findMany({
        select: {
          ticker: true,
          company: {
            select: {
              fantasyName: true,
              enterpriseValue: true,
            },
          },
        },
        orderBy: {
          company: {
            enterpriseValue: 'desc',
          },
        },
        where: {
          company: {
            enterpriseValue: {
              not: null,
            },
          },
        },
        take: 5,
      })

      const rankings = {
        greatestMarketValue,
        greatestEnterpriseValue,
      }

      reply.code(200)
      return { ok: true, data: rankings }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
