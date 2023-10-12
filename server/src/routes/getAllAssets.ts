import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getAllAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
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

      return reply.code(200).send(assets)
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
