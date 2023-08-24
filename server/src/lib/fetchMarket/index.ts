import { ENV } from 'src/env'

import { getAllCompanyFinancialRatios } from './companies/getAllCompanyFinancialRatios'
import { getAllCompanyMarketRatios } from './companies/getAllCompanyMarketRatios'
import { getCompanies } from './companies/getCompanies'
import { getCompany } from './companies/getCompany'
import { getLastCompanyFinancialRatio } from './companies/getLastCompanyFinancialRatio'
import { getLastCompanyMarketRatio } from './companies/getLastCompanyMarketRatio'

export type FetchMarketResponse<T> =
  | {
      ok: false
      error: unknown
    }
  | {
      ok: true
      data: T
    }

export async function fetchMarketGeneral<T>(
  url: string,
): Promise<FetchMarketResponse<T>> {
  try {
    const data = await fetch(`https://api.dadosdemercado.com.br/v1/${url}`, {
      headers: {
        Authorization: `Bearer ${ENV.MARKET_API_TOKEN}}`,
        Accept: 'application/json',
      },
      method: 'GET',
      cache: 'no-cache',
    })

    const json = (await data.json()) as T

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

export const fetchMarket = {
  companies: {
    getCompanies,
    getCompany,
    getAllCompanyMarketRatios,
    getLastCompanyMarketRatio,
    getAllCompanyFinancialRatios,
    getLastCompanyFinancialRatio,
  },
}
