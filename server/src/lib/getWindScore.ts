import { Asset, Company, Fundamentals } from '@prisma/client'
import { getAverage } from 'src/utils/getAverage'

export type WindScore = {
  valuation: number | null
  efficiency: number | null
  debt: number | null
  profitability: number | null
  windFinalScore: number
  holderChecklist: {
    liquidity: boolean
    debt: boolean
    roe: boolean
    profit: boolean
  }
}

type GetWindScore = {
  asset: Asset
  company: Company
  fundamentals: Fundamentals
}

const getWindScoreFormattedNumber = (value: number | null) => {
  const isInvalid =
    value === null || Number.isNaN(value) || !Number.isFinite(value)
  return isInvalid ? null : value
}

const getValuationScore = (fundamentals: Fundamentals) => {
  if (
    fundamentals.priceToProfitRatio === null ||
    fundamentals.priceToBookRatio === null ||
    fundamentals.evToEbitRatio === null
  ) {
    return null
  }

  const dividendMultiplier = fundamentals.dividendYield
    ? 1 + fundamentals.dividendYield / 100
    : 1

  let valuationBadMultiplier =
    fundamentals.priceToProfitRatio *
    fundamentals.priceToBookRatio *
    fundamentals.evToEbitRatio

  const valuationGoodMultiplier = dividendMultiplier

  if (
    fundamentals.priceToProfitRatio < 0 ||
    fundamentals.priceToBookRatio < 0 ||
    fundamentals.evToEbitRatio < 0
  ) {
    valuationBadMultiplier = Math.abs(valuationBadMultiplier) * -1
  }

  const score = Math.sqrt(valuationGoodMultiplier / valuationBadMultiplier)

  return score * 100
}

const getEfficiencyScore = (fundamentals: Fundamentals) => {
  if (fundamentals.ebitMargin === null || fundamentals.netMargin === null) {
    return null
  }

  const grossMarginMultiplier = fundamentals.grossMargin
    ? 1 + fundamentals.grossMargin / 100
    : 1

  const netAndEbitMarginMultiplier = getAverage([
    fundamentals.ebitMargin,
    fundamentals.netMargin,
  ])

  const score = grossMarginMultiplier * (1 + netAndEbitMarginMultiplier / 100)

  return score * 5
}

const getDebtScore = (fundamentals: Fundamentals) => {
  if (
    fundamentals.currentLiquidity === null ||
    fundamentals.equityToAssetsRatio === null
  ) {
    return null
  }

  const score = Math.sqrt(
    fundamentals.currentLiquidity * fundamentals.equityToAssetsRatio,
  )

  return score * 10
}

const getProfitabilityScore = (fundamentals: Fundamentals) => {
  if (
    fundamentals.returnOnEquity === null ||
    fundamentals.returnOnEquity <= 0 ||
    fundamentals.returnOnInvestedCapital === null ||
    fundamentals.returnOnInvestedCapital <= 0 ||
    fundamentals.assetTurnover === null ||
    fundamentals.assetTurnover <= 0
  ) {
    return null
  }

  const roeRoicMultiplier =
    fundamentals.returnOnEquity + fundamentals.returnOnInvestedCapital

  const score = Math.log2(
    Math.pow(roeRoicMultiplier, 2) * fundamentals.assetTurnover,
  )

  return score
}

export const getWindScore = ({
  asset,
  company,
  fundamentals,
}: GetWindScore): WindScore => {
  const valuation = getValuationScore(fundamentals)
  const efficiency = getEfficiencyScore(fundamentals)
  const debt = getDebtScore(fundamentals)
  const profitability = getProfitabilityScore(fundamentals)
  const windFinalScore = getAverage([
    valuation || 0,
    valuation || 0,
    efficiency || 0,
    debt || 0,
    profitability || 0,
  ])

  const holderChecklist = {
    liquidity: asset.liquidity !== null && asset.liquidity > 1000000,
    debt:
      company.grossDebt !== null &&
      company.netWorth !== null &&
      company.grossDebt < company.netWorth,
    roe:
      fundamentals.returnOnEquity !== null && fundamentals.returnOnEquity > 10,
    profit: !!company.profitable,
  }

  return {
    valuation: getWindScoreFormattedNumber(valuation),
    efficiency: getWindScoreFormattedNumber(efficiency),
    debt: getWindScoreFormattedNumber(debt),
    profitability: getWindScoreFormattedNumber(profitability),
    windFinalScore: getWindScoreFormattedNumber(windFinalScore) ?? 0,
    holderChecklist,
  }
}
