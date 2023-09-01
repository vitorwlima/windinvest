import { FastifyInstance } from 'fastify'
import { getWindScore } from 'src/lib/getWindScore'
import { StatusInvest } from 'status-invest-api'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get<{ Params: { ticker: string } }>(
    '/asset/:ticker',
    async (request, reply) => {
      try {
        const { ticker } = request.params
        const stock = await StatusInvest.getStock({ ticker })

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
