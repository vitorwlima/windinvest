import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { prisma } from 'src/lib/prisma'

export const getRanking = async (fastify: FastifyInstance) => {
  fastify.get('/ranking', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
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

      return reply.code(200).send(rankings)
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
