import { getAuth } from '@clerk/fastify'
import { B3Scraper } from 'b3-scraper'
import { FastifyInstance } from 'fastify'
import { getGrahamPrice } from 'src/lib/getGrahamPrice'
import { getWindScore } from 'src/lib/getWindScore'
import { z } from 'zod'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get('/asset/:ticker', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    const paramsSchema = z.object({
      ticker: z.string(),
    })

    const { ticker } = paramsSchema.parse(request.params)

    try {
      const stock = await B3Scraper.getStock({ ticker, showLogs: true })

      if (!stock) {
        reply.code(404)
        return { ok: false, error: 'Stock not found' }
      }

      const windScore = getWindScore(stock)
      const grahamPrice = getGrahamPrice(stock)

      reply.code(200)
      return { ok: true, data: { ...stock, windScore, grahamPrice } }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
