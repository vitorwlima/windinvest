import { useQuery } from '@tanstack/react-query'
import { ENV } from 'src/utils/env'

type GetAssetArgs = {
  ticker: string
}

export type Asset = {
  about: {
    name: string
  }
  valuation: {
    price: number | null
    dividendYield: number | null
    changeInLast12Months: number | null
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
    holderChecklist: {
      liquidity: boolean
      debt: boolean
      roe: boolean
      profit: boolean
    }
  }
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
  return useQuery<AssetResponse>({
    queryKey: ['asset', ticker],
    queryFn: async () => {
      const res = await fetch(
        `${ENV.NEXT_PUBLIC_SERVER_URL}/asset/${ticker.toUpperCase()}`,
      )
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
