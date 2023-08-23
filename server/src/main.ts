import { fetchMarket } from './utils/fetchMarket'

const test = async () => {
  const res = await fetchMarket(
    'companies/6505/market_ratios?period_init=2023-08-22',
  )
  if (res.ok) {
    console.log(res.data)
  }
}

test()
