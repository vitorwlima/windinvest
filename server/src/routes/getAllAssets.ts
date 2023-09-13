import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getAllAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets', async (request, reply) => {
    const querySchema = z.object({
      search: z.string().optional(),
    })

    const { search } = querySchema.parse(request.query)

    try {
      const stocks = await prisma.asset.findMany({
        orderBy: {
          ticker: 'asc',
        },
        select: {
          ticker: true,
          fantasyName: true,
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
              fantasyName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      })

      reply.code(200)
      return { ok: true, data: stocks }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
