import { Stock } from 'b3-scraper/dist/@types/stock'

export const getGrahamPrice = (stock: Stock): number | null => {
  if (
    stock.valuation.profitByShare === null ||
    stock.valuation.bookValuePerShare === null
  ) {
    return null
  }

  const grahamPrice = Math.sqrt(
    22.5 * stock.valuation.profitByShare * stock.valuation.bookValuePerShare,
  )

  return grahamPrice
}
