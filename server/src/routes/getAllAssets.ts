import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'

export const getAllAssets = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: { search: string } }>(
    '/assets',
    async (request, reply) => {
      const { search } = request.query
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
    },
  )
}
