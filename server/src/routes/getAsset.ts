import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'
import { getGrahamPrice } from 'src/lib/getGrahamPrice'
import { getQuote } from 'src/lib/getQuote'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get('/asset/:ticker', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const { isUserPro } = await getIsUserPro(userId)

    const paramsSchema = z.object({
      ticker: z.string(),
    })

    const { ticker } = paramsSchema.parse(request.params)

    try {
      const [asset, quote] = await Promise.all([
        prisma.asset.findFirst({
          where: {
            ticker,
          },
          include: {
            company: {
              select: {
                cnpj: true,
                companyName: true,
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
            fundamentals: true,
            windScore: isUserPro,
          },
        }),
        getQuote(ticker),
      ])

      if (!asset) {
        reply.code(404)
        return { ok: false, error: 'Asset not found' }
      }

      const grahamPrice = getGrahamPrice(asset.fundamentals)
      const windScore = isUserPro ? asset.windScore : ('Forbidden' as const)

      const finalAsset = {
        ...asset,
        quote,
        grahamPrice,
        windScore,
      }

      return reply.code(200).send(finalAsset)
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
