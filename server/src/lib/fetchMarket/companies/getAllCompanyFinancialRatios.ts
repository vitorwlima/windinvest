import { fetchMarketGeneral } from '..'
import { FinancialRatio } from './financial_ratio'

type GetCompanyArgs = {
  ticker: string
}

export const getAllCompanyFinancialRatios = async ({
  ticker,
}: GetCompanyArgs) => {
  const res = await fetchMarketGeneral<FinancialRatio[]>(
    `companies/${ticker}/ratios`,
  )
  return res
}
