import { ENV } from 'src/env'

export const fetchMarket = async (url: string) => {
  try {
    const data = await fetch(`https://api.dadosdemercado.com.br/v1/${url}`, {
      headers: {
        Authorization: `Bearer ${ENV.MARKET_API_TOKEN}}`,
        Accept: 'application/json',
      },
      method: 'GET',
      cache: 'no-cache',
    })

    const json = await data.json()

    return {
      ok: true,
      data: json,
    }
  } catch (error) {
    return {
      ok: false,
      error,
    }
  }
}
