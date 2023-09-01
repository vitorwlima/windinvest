import { Stock } from 'status-invest-api/dist/@types/stock'

const getValuationScore = (valuation: Stock['valuation']) => {
  if (
    valuation.evToEbitRatio === null ||
    valuation.evToEbitdaRatio === null ||
    valuation.dividendYield === null ||
    valuation.priceToBookRatio === null ||
    valuation.priceToProfitRatio === null
  ) {
    return null
  }
  const averageEvToEbit =
    (valuation.evToEbitRatio + valuation.evToEbitdaRatio) / 2

  const score =
    Math.sqrt(valuation.dividendYield || 1) /
    (valuation.priceToProfitRatio *
      valuation.priceToBookRatio *
      averageEvToEbit)

  return score * 1000
}

const getEfficiencyScore = (efficiency: Stock['efficiency']) => {
  if (
    efficiency.ebitMargin === null ||
    efficiency.ebitdaMargin === null ||
    efficiency.netMargin === null
  ) {
    return null
  }

  const averageEbitMargins =
    (efficiency.ebitMargin + efficiency.ebitdaMargin) / 2

  const score = (averageEbitMargins + efficiency.netMargin) / 2

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
    profitability.returnOnAssets === null ||
    profitability.returnOnInvestedCapital === null ||
    profitability.assetTurnover === null
  ) {
    return null
  }

  const score =
    Math.sqrt(
      profitability.returnOnEquity *
        profitability.returnOnAssets *
        profitability.returnOnInvestedCapital,
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
