import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getBestAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets/best', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const isUserPro = await getIsUserPro(userId)

    if (!isUserPro) {
      return reply.code(403).send({ error: 'Forbidden' })
    }

    const querySchema = z.object({
      sectorId: z.string().optional(),
      subsectorId: z.string().optional(),
      page: z.string(),
      debt: z.enum(['true', 'false']),
      liquidity: z.enum(['true', 'false']),
      profit: z.enum(['true', 'false']),
      roe: z.enum(['true', 'false']),
    })

    const { sectorId, subsectorId, page, debt, liquidity, profit, roe } =
      querySchema.parse(request.query)

    try {
      const [assets, count] = await prisma.$transaction([
        prisma.asset.findMany({
          select: {
            ticker: true,
            company: {
              select: {
                fantasyName: true,
                sector: {
                  select: {
                    name: true,
                  },
                },
                subsector: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            windScore: {
              select: {
                windFinalScore: true,
              },
            },
          },
          where: {
            company: {
              sector: {
                name: sectorId || undefined,
              },
              subsector: {
                name: subsectorId || undefined,
              },
            },
            windScore: {
              checklistDebt: debt === 'true' ? true : undefined,
              checklistLiquidity: liquidity === 'true' ? true : undefined,
              checklistProfit: profit === 'true' ? true : undefined,
              checklistRoe: roe === 'true' ? true : undefined,
            },
          },
          orderBy: {
            windScore: {
              windFinalScore: 'desc',
            },
          },
          skip: 10 * (Number(page) - 1),
          take: 10,
        }),
        prisma.asset.count({
          where: {
            company: {
              sector: {
                name: sectorId || undefined,
              },
              subsector: {
                name: subsectorId || undefined,
              },
            },
            windScore: {
              checklistDebt: debt === 'true' ? true : undefined,
              checklistLiquidity: liquidity === 'true' ? true : undefined,
              checklistProfit: profit === 'true' ? true : undefined,
              checklistRoe: roe === 'true' ? true : undefined,
            },
          },
        }),
      ])

      return reply.code(200).send({ assets, count })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
