import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetBestAssetsArgs = {
  page: number
  sector: string
  subSector: string
  liquidity: boolean
  roe: boolean
  debt: boolean
  profit: boolean
}

export type BestAssets = {
  ticker: string
  fantasyName: string
  sector: string
  subSector: string
  windScore: {
    windFinalScore: number
  }
}[]

type BestAssetsResponse = {
  assets: BestAssets
  count: number
}

type AssetResponse =
  | {
      ok: false
      error: unknown | 'Forbidden'
    }
  | {
      ok: true
      data: BestAssetsResponse
    }

export const useGetBestAssets = ({
  page,
  sector,
  subSector,
  debt,
  liquidity,
  profit,
  roe,
}: GetBestAssetsArgs) => {
  const fetch = useFetch()

  const params = new URLSearchParams({
    page: String(page),
    sector,
    subSector,
    debt: String(debt),
    liquidity: String(liquidity),
    profit: String(profit),
    roe: String(roe),
  })

  return useQuery<AssetResponse>({
    queryKey: [
      'best-assets',
      page,
      sector,
      subSector,
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
