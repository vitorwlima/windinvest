import { fetchMarketGeneral } from '..'
import { Company } from './company'

export const getCompanies = async () => {
  const res = await fetchMarketGeneral<Company[]>('companies')
  return res
}
