import { fetchMarketGeneral } from '..'
import { MarketRatio } from './market_ratio'

type GetCompanyArgs = {
  ticker: string
}

export const getAllCompanyMarketRatios = async ({ ticker }: GetCompanyArgs) => {
  const res = await fetchMarketGeneral<MarketRatio[]>(
    `companies/${ticker}/market_ratios`,
  )
  return res
}
