import { getAuth } from '@clerk/fastify'
import { FastifyInstance } from 'fastify'
import { getIsUserPremium } from 'src/lib/getIsUserPremium'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getBestAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets/best', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    const isUserPremium = await getIsUserPremium(userId)

    if (!isUserPremium) {
      reply.code(403)
      return { ok: false, error: 'Forbidden' }
    }

    const querySchema = z.object({
      sector: z.string(),
      subSector: z.string(),
      page: z.string(),
      debt: z.enum(['true', 'false']),
      liquidity: z.enum(['true', 'false']),
      profit: z.enum(['true', 'false']),
      roe: z.enum(['true', 'false']),
    })

    const { sector, subSector, page, debt, liquidity, profit, roe } =
      querySchema.parse(request.query)

    try {
      const [assets, count] = await prisma.$transaction([
        prisma.asset.findMany({
          select: {
            ticker: true,
            company: {
              select: {
                fantasyName: true,
                sector: true,
                subsector: true,
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
                name: sector || undefined,
              },
              subsector: {
                name: subSector || undefined,
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
                name: sector || undefined,
              },
              subsector: {
                name: subSector || undefined,
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

      reply.code(200)
      return { ok: true, data: { assets, count } }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
