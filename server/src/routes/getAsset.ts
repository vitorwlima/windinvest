import { B3Scraper } from 'b3-scraper'
import { FastifyInstance } from 'fastify'
import { getWindScore } from 'src/lib/getWindScore'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get<{ Params: { ticker: string } }>(
    '/asset/:ticker',
    async (request, reply) => {
      try {
        const { ticker } = request.params
        const stock = await B3Scraper.getStock({ ticker, showLogs: true })

        if (!stock) {
          reply.code(404)
          return { ok: false, error: 'Stock not found' }
        }

        const windScore = getWindScore(stock)

        reply.code(200)
        return { ok: true, data: { ...stock, windScore } }
      } catch (error) {
        reply.code(500)
        return { ok: false, error }
      }
    },
  )
}
