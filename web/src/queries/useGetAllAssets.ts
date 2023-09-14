import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'

type GetAllAssetsArgs = {
  search: string
}

export type AssetBase = {
  ticker: string
  fantasyName: string
}

type AssetResponse =
  | {
      ok: false
      error: unknown
    }
  | {
      ok: true
      data: AssetBase[]
    }

export const useGetAllAssets = ({ search }: GetAllAssetsArgs) => {
  return useQuery<AssetResponse>({
    queryKey: ['all-assets', search],
    enabled: !!search,
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/assets?search=${search}`,
      )
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
