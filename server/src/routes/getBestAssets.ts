import { getAuth } from '@clerk/fastify'
import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getBestAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets/best', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    const querySchema = z.object({
      sector: z.string(),
      subSector: z.string(),
      page: z.string(),
    })

    const { sector, subSector, page } = querySchema.parse(request.query)

    try {
      const [assets, count] = await prisma.$transaction([
        prisma.asset.findMany({
          select: {
            ticker: true,
            fantasyName: true,
            sector: true,
            subSector: true,
            windScore: {
              select: {
                windFinalScore: true,
              },
            },
          },
          where: {
            sector: sector || undefined,
            subSector: subSector || undefined,
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
            sector: sector || undefined,
            subSector: subSector || undefined,
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
