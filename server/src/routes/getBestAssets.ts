import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getBestAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets/best', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    const isUserPro = await getIsUserPro(userId)

    if (!isUserPro) {
      reply.code(403)
      return { ok: false, error: 'Forbidden' }
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

      reply.code(200)
      return { ok: true, data: { assets, count } }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
