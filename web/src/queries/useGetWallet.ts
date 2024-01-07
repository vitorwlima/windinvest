import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type GetWalletArgs = {
  id: string
}

type WalletResponse = {
  id: string
  title: string
  description: string
  assets: {
    ticker: string
    windFinalScore: number
    company: {
      fantasyName: string
    }
  }[]
  error?: 'Forbidden' | 'Not Found'
}

export const useGetWallet = ({ id }: GetWalletArgs) => {
  const fetch = useFetch()

  return useQuery<WalletResponse>({
    queryKey: ['wallet', id],
    queryFn: async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/wallets/${id}`)
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
