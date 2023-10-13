import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type AssetResponse = {
  greatestMarketValue: {
    ticker: string
    company: {
      fantasyName: string
      marketValue: number | null
    }
  }[]
  greatestEnterpriseValue: {
    ticker: string
    company: {
      fantasyName: string
      enterpriseValue: number | null
    }
  }[]
}

export const useGetRanking = () => {
  const fetch = useFetch()

  return useQuery<AssetResponse>({
    queryKey: ['ranking'],
    queryFn: async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/ranking`)
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
