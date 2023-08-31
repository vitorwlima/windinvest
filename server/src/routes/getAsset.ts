import { FastifyInstance } from 'fastify'
import { StatusInvest } from 'status-invest-api'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get<{ Params: { ticker: string } }>(
    '/asset/:ticker',
    async (request, reply) => {
      try {
        const { ticker } = request.params
        const stock = await StatusInvest.getStock({ ticker })

        reply.code(200)
        return { ok: true, data: stock }
      } catch (error) {
        reply.code(500)
        return { ok: false, error }
      }
    },
  )
}
