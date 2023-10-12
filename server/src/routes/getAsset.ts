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
      return reply.code(401).send({ error: 'Unauthorized' })
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

      return reply.code(200).send(finalAsset)
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
