import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetBestAssetsArgs = {
  page: number
  sectorId: string
  subsectorId: string
  liquidity: boolean
  roe: boolean
  debt: boolean
  profit: boolean
}

export type BestAssets = {
  ticker: string
  windScore: {
    windFinalScore: number
  }
  company: {
    fantasyName: string
    sector: {
      name: string
    } | null
    subsector: {
      name: string
    } | null
  }
}[]

type BestAssetsResponse = {
  assets: BestAssets
  count: number
  error?: 'Forbidden'
}

export const useGetBestAssets = ({
  page,
  sectorId,
  subsectorId,
  debt,
  liquidity,
  profit,
  roe,
}: GetBestAssetsArgs) => {
  const fetch = useFetch()

  const params = new URLSearchParams({
    page: String(page),
    sectorId,
    subsectorId,
    debt: String(debt),
    liquidity: String(liquidity),
    profit: String(profit),
    roe: String(roe),
  })

  return useQuery<BestAssetsResponse>({
    queryKey: [
      'best-assets',
      page,
      sectorId,
      subsectorId,
      debt,
      liquidity,
      profit,
      roe,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/assets/best?${params.toString()}`,
      )
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
