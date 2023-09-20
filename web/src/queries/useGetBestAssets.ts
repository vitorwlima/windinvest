import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetBestAssetsArgs = {
  page: number
  sector: string
  subSector: string
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
}: GetBestAssetsArgs) => {
  const fetch = useFetch()

  const params = new URLSearchParams({
    page: String(page),
    sector,
    subSector,
  })

  return useQuery<AssetResponse>({
    queryKey: ['best-assets', page, sector, subSector],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/assets/best?${params.toString()}`,
      )
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
