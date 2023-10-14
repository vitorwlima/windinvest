import { useAuth } from '@clerk/nextjs'

export const useFetch = () => {
  const { getToken } = useAuth()

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const token = await getToken()

    if (!token) {
      window.location.reload()
      throw new Error('Token not found.')
    }

    const opts = init || {}

    return fetch(input, {
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(opts.headers || {}),
      },
    })
  }
}
