import { Stock } from 'b3-scraper/dist/@types/stock'

const getValuationScore = (valuation: Stock['valuation']) => {
  if (
    valuation.evToEbitRatio === null ||
    valuation.dividendYield === null ||
    valuation.priceToBookRatio === null ||
    valuation.priceToProfitRatio === null
  ) {
    return null
  }

  const score =
    Math.sqrt(valuation.dividendYield || 1) /
    (valuation.priceToProfitRatio *
      valuation.priceToBookRatio *
      valuation.evToEbitRatio)

  return score * 1000
}

const getEfficiencyScore = (efficiency: Stock['efficiency']) => {
  if (efficiency.ebitMargin === null || efficiency.netMargin === null) {
    return null
  }

  const score = (efficiency.ebitMargin + efficiency.netMargin) / 2

  return score
}

const getDebtScore = (debt: Stock['debt']) => {
  if (debt.currentLiquidity === null || debt.equityToAssetsRatio === null) {
    return null
  }

  const score = Math.sqrt(debt.currentLiquidity * debt.equityToAssetsRatio)

  return score
}

const getProfitabilityScore = (profitability: Stock['profitability']) => {
  if (
    profitability.returnOnEquity === null ||
    profitability.returnOnInvestedCapital === null ||
    profitability.assetTurnover === null
  ) {
    return null
  }

  const score =
    Math.sqrt(
      profitability.returnOnEquity * profitability.returnOnInvestedCapital,
    ) * profitability.assetTurnover

  return score
}

export const getWindScore = (stock: Stock) => {
  const valuation = getValuationScore(stock.valuation)
  const efficiency = getEfficiencyScore(stock.efficiency)
  const debt = getDebtScore(stock.debt)
  const profitability = getProfitabilityScore(stock.profitability)

  return { valuation, efficiency, debt, profitability }
}
