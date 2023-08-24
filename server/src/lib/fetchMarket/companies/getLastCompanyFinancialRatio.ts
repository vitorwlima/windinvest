import { FetchMarketResponse, fetchMarketGeneral } from '..'
import { FinancialRatio } from './financial_ratio'

type GetCompanyArgs = {
  ticker: string
}

export const getLastCompanyFinancialRatio = async ({
  ticker,
}: GetCompanyArgs): Promise<FetchMarketResponse<FinancialRatio>> => {
  const res = await fetchMarketGeneral<FinancialRatio[]>(
    `companies/${ticker}/ratios`,
  )

  if (res.ok) {
    return {
      ok: res.ok,
      data: res.data[res.data.length - 1],
    }
  }

  return res
}
