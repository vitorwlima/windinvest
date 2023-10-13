import { env } from 'src/env'

type BrapiResponse = {
  results: {
    regularMarketPrice: number
    fiftyTwoWeekLow: number
    fiftyTwoWeekHigh: number
    logourl: string
    historicalDataPrice: {
      date: string
      open: number
      high: number
      low: number
      close: number
      volume: number
      adjustedClose: number
    }[]
  }[]
}

type Quote = {
  price: number
  fiftyTwoWeekLow: number
  fiftyTwoWeekHigh: number
  logoUrl: string
  threeMonthChangePercent: number
}

export const getQuote = async (ticker: string): Promise<Quote> => {
  const params = new URLSearchParams({
    token: env.BRAPI_TOKEN,
    interval: '1d',
    range: '3mo',
  })

  const data = await fetch(
    `https://brapi.dev/api/quote/${ticker}?${params.toString()}`,
  )

  const json = (await data.json()) as BrapiResponse | undefined

  const validQuote = (json?.results?.length ?? 0) > 0

  if (!validQuote) {
    return {
      price: 0,
      fiftyTwoWeekLow: 0,
      fiftyTwoWeekHigh: 0,
      logoUrl: '',
      threeMonthChangePercent: 0,
    }
  }

  const [result] = json?.results ?? []

  return {
    price: result.regularMarketPrice,
    fiftyTwoWeekLow: result.fiftyTwoWeekLow,
    fiftyTwoWeekHigh: result.fiftyTwoWeekHigh,
    logoUrl: result.logourl,
    threeMonthChangePercent:
      (result.regularMarketPrice / result.historicalDataPrice[0].close - 1) *
      100,
  }
}
