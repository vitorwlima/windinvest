import { useQuery } from '@tanstack/react-query'
import { ENV } from 'src/utils/env'

export type Ranking = {
  greatestMarketValue: {
    ticker: string
    fantasyName: string
    marketValue: number
  }[]
  greatestIncome: {
    ticker: string
    fantasyName: string
    netIncome: number
  }[]
}

type AssetResponse =
  | {
      ok: false
      error: unknown
    }
  | {
      ok: true
      data: Ranking
    }

export const useGetRanking = () => {
  return useQuery<AssetResponse>({
    queryKey: ['ranking'],
    queryFn: async () => {
      const res = await fetch(`${ENV.NEXT_PUBLIC_SERVER_URL}/ranking`)
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
