import { fetchMarketGeneral } from '..'
import { Company } from './company'

type GetCompanyArgs = {
  ticker: string
}

export const getCompany = async ({ ticker }: GetCompanyArgs) => {
  const res = await fetchMarketGeneral<Company>(`companies/${ticker}`)
  return res
}
