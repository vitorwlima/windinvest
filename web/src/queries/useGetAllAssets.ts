import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetAllAssetsArgs = {
  search: string
}

type AssetResponse = {
  ticker: string
  company: {
    fantasyName: string
  }
}[]

export const useGetAllAssets = ({ search }: GetAllAssetsArgs) => {
  const fetch = useFetch()

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
