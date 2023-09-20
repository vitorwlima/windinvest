import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetAssetArgs = {
  ticker: string
}

export type Asset = {
  about: {
    ticker: string | null
    name: string | null
    averageLiquidity: number | null
    sector: string | null
    subSector: string | null
    numberOfShares: number | null
  }
  quote: {
    price: number | null
    oscilationIn30Days: number | null
    oscilationIn12Months: number | null
    minPriceIn52Weeks: number | null
    maxPriceIn52Weeks: number | null
    lastQuoteDate: string | null
  }
  balance: {
    marketValue: number | null
    enterpriseValue: number | null
    netIncome: number | null
    ebit: number | null
    netProfit: number | null
    assets: number | null
    currentAssets: number | null
    grossDebt: number | null
    netDebt: number | null
    netWorth: number | null
  }
  valuation: {
    dividendYield: number | null
    priceToProfitRatio: number | null
    priceToBookRatio: number | null
    evToEbitRatio: number | null
    priceToEbitRatio: number | null
    bookValuePerShare: number | null
    priceToAssets: number | null
    profitByShare: number | null
    priceToCapitalRatio: number | null
    priceToLiquidAsset: number | null
  }
  debt: {
    netDebtToEquityRatio: number | null
    netDebtToEbitRatio: number | null
    equityToAssetsRatio: number | null
    currentLiquidity: number | null
  }
  efficiency: {
    grossMargin: number | null
    ebitMargin: number | null
    netMargin: number | null
  }
  profitability: {
    returnOnEquity: number | null
    returnOnInvestedCapital: number | null
    assetTurnover: number | null
  }
  windScore: {
    valuation: number | null
    efficiency: number | null
    debt: number | null
    profitability: number | null
    windFinalScore: number
    holderChecklist: {
      liquidity: boolean
      debt: boolean
      roe: boolean
      profit: boolean
    }
  }
  grahamPrice: number | null
}

type AssetResponse =
  | {
      ok: false
      error: unknown
    }
  | {
      ok: true
      data: Asset
    }

export const useGetAsset = ({ ticker }: GetAssetArgs) => {
  const fetch = useFetch()

  return useQuery<AssetResponse>({
    queryKey: ['asset', ticker],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/asset/${ticker.toUpperCase()}`,
      )
      return res.json()
    },
  })
}
