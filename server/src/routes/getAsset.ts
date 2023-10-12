import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'
import { getGrahamPrice } from 'src/lib/getGrahamPrice'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get('/asset/:ticker', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    const isUserPro = await getIsUserPro(userId)

    const paramsSchema = z.object({
      ticker: z.string(),
    })

    const { ticker } = paramsSchema.parse(request.params)

    try {
      const asset = await prisma.asset.findFirst({
        where: {
          ticker,
        },
        include: {
          company: true,
          fundamentals: true,
          windScore: isUserPro,
        },
      })

      if (!asset) {
        reply.code(404)
        return { ok: false, error: 'Asset not found' }
      }

      const finalAsset = {
        ...asset,
        grahamPrice: getGrahamPrice(asset.fundamentals),
        windScore: isUserPro ? asset.windScore : 'Forbidden',
      }

      reply.code(200)
      return {
        ok: true,
        data: finalAsset,
      }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
