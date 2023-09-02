import { B3Scraper } from 'b3-scraper'
import { FastifyInstance } from 'fastify'

export const getAllAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets', async (request, reply) => {
    try {
      const stocks = await B3Scraper.getAllStocks()

      if (!stocks) {
        reply.code(404)
        return { ok: false, error: 'Could not retrieve stocks' }
      }

      reply.code(200)
      return { ok: true, data: stocks }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
