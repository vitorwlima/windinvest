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
    pegRatio: number | null
    priceToBookRatio: number | null
    evToEbitdaRatio: number | null
    evToEbitRatio: number | null
    priceToEbitdaRatio: number | null
    priceToEbitRatio: number | null
    bookValuePerShare: number | null
    priceToAssets: number | null
    profitByShare: number | null
    priceToSalesRatio: number | null
    priceToCapitalRatio: number | null
    priceToLiquidAsset: number | null
  }
  debt: {
    netDebtToEquityRatio: number | null
    netDebtToEbitdaRatio: number | null
    netDebtToEbitRatio: number | null
    equityToAssetsRatio: number | null
    liabilitiesToAssetsRatio: number | null
    currentLiquidity: number | null
  }
  efficiency: {
    grossMargin: number | null
    ebitdaMargin: number | null
    ebitMargin: number | null
    netMargin: number | null
  }
  profitability: {
    returnOnEquity: number | null
    returnOnAssets: number | null
    returnOnInvestedCapital: number | null
    assetTurnover: number | null
  }
  growth: {
    cagrRevenue5Years: number | null
    cagrProfits5Years: number | null
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
