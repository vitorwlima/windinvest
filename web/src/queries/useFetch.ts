import { useAuth } from '@clerk/nextjs'

export const useFetch = () => {
  const { getToken } = useAuth()

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const opts = init || {}

    return fetch(input, {
      ...opts,
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        ...(opts.headers || {}),
      },
    })
  }
}
