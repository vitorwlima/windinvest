import { useQuery } from '@tanstack/react-query'
import { env } from 'src/utils/env'
import { useFetch } from './useFetch'

type StripeSubscriptionURLResponse = {
  url: string
  isUserPro: boolean
  domain: string | null
}

export const useGetSubscriptionData = () => {
  const fetch = useFetch()

  return useQuery<StripeSubscriptionURLResponse>({
    queryKey: ['stripe-subscription'],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/get-subscription-data`,
      )
      return res.json()
    },
  })
}
