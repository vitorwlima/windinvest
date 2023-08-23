import { endOfYesterday } from 'date-fns'
import { FastifyInstance } from 'fastify'
import { fetchMarket } from 'src/utils/fetchMarket'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get<{ Params: { asset: string } }>(
    '/:asset',
    async (request, reply) => {
      const yesterdayOrFridayIfWeekend = endOfYesterday()
        .toISOString()
        .split('T')[0]
      const { data: ratios } = await fetchMarket(
        `companies/${request.params.asset}/market_ratios?period_init=${yesterdayOrFridayIfWeekend}`,
      )

      const data = {
        name: 'Nome da empresa', // fazer obj pra nao precisar fazer fetch disso
      }

      reply.code(200)
      return { ratios }
    },
  )
}
