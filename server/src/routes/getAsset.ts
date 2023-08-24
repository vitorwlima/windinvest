import { FastifyInstance } from 'fastify'
import { fetchMarket } from 'src/lib/fetchMarket'

export const getAsset = async (fastify: FastifyInstance) => {
  fastify.get<{ Params: { ticker: string } }>(
    '/:ticker',
    async (request, reply) => {
      const { ticker } = request.params

      const company = await fetchMarket.companies.getCompany({ ticker })

      if (!company.ok) {
        reply.code(500)
        return { ok: false, error: 'Houve um erro ao buscar esse ativo.' }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const marketRatio = await fetchMarket.companies.getLastCompanyMarketRatio(
        {
          ticker,
        },
      )

      if (!marketRatio.ok) {
        reply.code(500)
        return { ok: false, error: 'Houve um erro ao buscar esse ativo.' }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const financialRatio =
        await fetchMarket.companies.getLastCompanyFinancialRatio({ ticker })

      if (!financialRatio.ok) {
        reply.code(500)
        return { ok: false, error: 'Houve um erro ao buscar esse ativo.' }
      }

      const data = {
        company: company.data, // fazer obj pra nao precisar fazer fetch disso
        marketRatio: marketRatio.data,
        financialRatio: financialRatio.data,
      }

      reply.code(200)
      return data
    },
  )
}
