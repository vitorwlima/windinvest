import { Stock } from 'b3-scraper/dist/@types/stock'
import { getHarmonicAverage } from 'src/utils/getHarmonicAverage'

const getValuationScore = (valuation: Stock['valuation']) => {
  if (
    valuation.priceToProfitRatio === null ||
    valuation.priceToBookRatio === null ||
    valuation.evToEbitRatio === null
  ) {
    return null
  }

  const dividendMultiplier = valuation.dividendYield
    ? 1 + valuation.dividendYield / 100
    : 1

  const valuationBadMultiplier =
    valuation.priceToProfitRatio *
    valuation.priceToBookRatio *
    valuation.evToEbitRatio

  const score =
    Math.sqrt(dividendMultiplier) / Math.log2(valuationBadMultiplier)

  return score * 100
}

const getEfficiencyScore = (efficiency: Stock['efficiency']) => {
  if (efficiency.ebitMargin === null || efficiency.netMargin === null) {
    return null
  }

  const grossMarginMultiplier = efficiency.grossMargin
    ? 1 + efficiency.grossMargin / 100
    : 1

  const netAndEbitMarginMultiplier = getHarmonicAverage([
    efficiency.ebitMargin,
    efficiency.netMargin,
  ])

  const score = Math.sqrt(grossMarginMultiplier) * netAndEbitMarginMultiplier

  return score
}

const getDebtScore = (debt: Stock['debt']) => {
  if (debt.currentLiquidity === null || debt.equityToAssetsRatio === null) {
    return null
  }

  const score = Math.sqrt(debt.currentLiquidity * debt.equityToAssetsRatio)

  return score * 10
}

const getProfitabilityScore = (profitability: Stock['profitability']) => {
  if (
    profitability.returnOnEquity === null ||
    profitability.returnOnInvestedCapital === null ||
    profitability.assetTurnover === null
  ) {
    return null
  }

  const roeRoicMultiplier = Math.sqrt(
    profitability.returnOnEquity * profitability.returnOnInvestedCapital,
  )

  const score = roeRoicMultiplier * profitability.assetTurnover

  return score
}

export const getWindScore = (stock: Stock) => {
  const valuation = getValuationScore(stock.valuation)
  const efficiency = getEfficiencyScore(stock.efficiency)
  const debt = getDebtScore(stock.debt)
  const profitability = getProfitabilityScore(stock.profitability)
  const windFinalScore = getHarmonicAverage([
    valuation ?? 0,
    valuation ?? 0,
    efficiency ?? 0,
    debt ?? 0,
    profitability ?? 0,
  ])

  const holderChecklist = {
    liquidity:
      stock.about.averageLiquidity !== null &&
      stock.about.averageLiquidity > 2000000,
    debt:
      stock.balance.grossDebt !== null &&
      stock.balance.netWorth !== null &&
      stock.balance.grossDebt < stock.balance.netWorth,
    roe:
      stock.profitability.returnOnEquity !== null &&
      stock.profitability.returnOnEquity > 10,
    profit: stock.balance.netProfit !== null && stock.balance.netProfit > 0,
  }

  return {
    valuation,
    efficiency,
    debt,
    profitability,
    windFinalScore,
    holderChecklist,
  }
}
