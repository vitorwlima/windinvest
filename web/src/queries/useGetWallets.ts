import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

export type WalletsResponse = {
  wallets: {
    id: string
    title: string
    description: string
    assetsCount: number
  }[]
  error?: 'Forbidden'
}

export const useGetWallets = () => {
  const fetch = useFetch()

  return useQuery<WalletsResponse>({
    queryKey: ['wallets'],
    queryFn: async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/wallets`)
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
