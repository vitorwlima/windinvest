import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetAssetArgs = {
  ticker: string
}

export type AssetResponse = {
  id: string
  ticker: string
  liquidity: number
  type: 'ON' | 'PN' | 'PNA' | 'PNB' | 'UNIT'
  company: {
    cnpj: string
    companyName: string
    fantasyName: string
    sector: {
      name: string
    }
    subsector: {
      name: string
    }
  }
  fundamentals: {
    dividendYield: number
    priceToProfitRatio: number
    priceToBookRatio: number
    evToEbitRatio: number
    priceToEbitRatio: number
    bookValuePerShare: number
    priceToAssets: number
    profitByShare: number
    priceToCapitalRatio: number
    priceToLiquidAsset: number
    netDebtToEquityRatio: number
    netDebtToEbitRatio: number
    equityToAssetsRatio: number
    currentLiquidity: number
    grossMargin: number
    ebitMargin: number
    netMargin: number
    returnOnEquity: number
    returnOnInvestedCapital: number
    assetTurnover: number
  }
  quote: {
    price: number
    fiftyTwoWeekLow: number
    fiftyTwoWeekHigh: number
    logoUrl: string
    threeMonthChangePercent: number
  }
  windScore:
    | {
        valuation: number
        efficiency: number
        debt: number
        profitability: number
        windFinalScore: number
        checklistLiquidity: boolean
        checklistDebt: boolean
        checklistRoe: boolean
        checklistProfit: boolean
      }
    | 'Forbidden'
  grahamPrice: number
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
