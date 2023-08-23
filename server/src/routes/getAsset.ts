import { startOfYesterday } from 'date-fns'
import { FastifyInstance } from 'fastify'
import { fetchMarket } from 'src/utils/fetchMarket'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get<{ Params: { asset: string } }>(
    '/:asset',
    async (request, reply) => {
      const yesterdayOrFridayIfWeekend = startOfYesterday()
        .toISOString()
        .split('T')[0]
      const { data: allMarketRatios } = await fetchMarket(
        `companies/${request.params.asset}/market_ratios?period_init=${yesterdayOrFridayIfWeekend}`,
      )

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { data: allRatios } = await fetchMarket(
        `companies/${request.params.asset}/ratios`,
      )

      const marketRatios = allMarketRatios.find(
        (ratio: any) => ratio.ticker === request.params.asset,
      )

      const data = {
        name: 'Nome da empresa', // fazer obj pra nao precisar fazer fetch disso
        ...marketRatios,
        allRatios,
      }

      reply.code(200)
      return data
    },
  )
}
