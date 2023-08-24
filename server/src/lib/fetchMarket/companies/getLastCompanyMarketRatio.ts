import { lastDayOfWeek, startOfYesterday } from 'date-fns'
import { FetchMarketResponse, fetchMarketGeneral } from '..'
import { MarketRatio } from './market_ratio'

type GetCompanyArgs = {
  ticker: string
}

export const getLastCompanyMarketRatio = async ({
  ticker,
}: GetCompanyArgs): Promise<FetchMarketResponse<MarketRatio>> => {
  const yesterdayOrFridayIfWeekend = [1, 2, 3, 4, 5].includes(
    startOfYesterday().getDay(),
  )
    ? startOfYesterday().toISOString().split('T')[0]
    : lastDayOfWeek(startOfYesterday()).toISOString().split('T')[0]

  const res = await fetchMarketGeneral<MarketRatio[]>(
    `companies/${ticker}/market_ratios?period_init=${yesterdayOrFridayIfWeekend}`,
  )

  if (res.ok) {
    return {
      ok: res.ok,
      data: res.data.filter((mr) => mr.ticker === ticker)[res.data.length - 1],
    }
  }

  return res
}
