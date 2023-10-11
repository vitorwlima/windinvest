import { getAuth } from '@clerk/fastify'
import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getAllAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    const querySchema = z.object({
      search: z.string().optional(),
    })

    const { search } = querySchema.parse(request.query)

    try {
      const assets = await prisma.asset.findMany({
        orderBy: {
          ticker: 'asc',
        },
        select: {
          ticker: true,
          company: {
            select: {
              fantasyName: true,
            },
          },
        },
        where: {
          OR: [
            {
              ticker: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              company: {
                fantasyName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
      })

      reply.code(200)
      return { ok: true, data: assets, auth: request.headers.authorization }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
