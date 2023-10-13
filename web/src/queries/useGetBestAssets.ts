import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetBestAssetsArgs = {
  page: number
  sector: string
  subsector: string
  liquidity: boolean
  debt: boolean
}

export type BestAssets = {
  ticker: string
  windFinalScore: number
  company: {
    fantasyName: string
  }
}[]

type BestAssetsResponse = {
  assets: BestAssets
  count: number
  error?: 'Forbidden'
}

export const useGetBestAssets = ({
  page,
  sector,
  subsector,
  debt,
  liquidity,
}: GetBestAssetsArgs) => {
  const fetch = useFetch()

  const params = new URLSearchParams({
    page: String(page),
    sector,
    subsector,
    debt: String(debt),
    liquidity: String(liquidity),
  })

  return useQuery<BestAssetsResponse>({
    queryKey: ['best-assets', page, sector, subsector, debt, liquidity],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/assets/best?${params.toString()}`,
      )
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
