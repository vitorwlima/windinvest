import { Asset } from 'src/queries/useGetAsset'
import { Unit, formatToBRL } from './formatToBRL'
import { formatToPercentage } from './formatToPercentage'
import { formatToRatio } from './formatToRatio'

export type FormattedAsset = {
  about: {
    ticker: string
    name: string
    averageLiquidity: string
    sector: string
    subSector: string
    numberOfShares: string
  }
  quote: {
    price: string
    oscilationIn30Days: string
    oscilationIn12Months: string
    minPriceIn52Weeks: string
    maxPriceIn52Weeks: string
    lastQuoteDate: string
  }
  balance: {
    marketValue: string
    enterpriseValue: string
    netIncome: string
    ebit: string
    netProfit: string
    assets: string
    currentAssets: string
    grossDebt: string
    netDebt: string
    netWorth: string
  }
  valuation: {
    dividendYield: string
    priceToProfitRatio: string
    priceToBookRatio: string
    evToEbitRatio: string
    priceToEbitRatio: string
    bookValuePerShare: string
    priceToAssets: string
    profitByShare: string
    priceToCapitalRatio: string
    priceToLiquidAsset: string
  }
  debt: {
    netDebtToEquityRatio: string
    netDebtToEbitRatio: string
    equityToAssetsRatio: string
    currentLiquidity: string
  }
  efficiency: {
    grossMargin: string
    ebitMargin: string
    netMargin: string
  }
  profitability: {
    returnOnEquity: string
    returnOnInvestedCapital: string
    assetTurnover: string
  }
  windScore: Asset['windScore']
  grahamPrice: string
}

export const getBRLFormattedValue = (
  value: number | null,
  unit?: Unit,
): string => {
  return value ? formatToBRL(value, unit) : 'N/A'
}

const getPercentageFormattedValue = (value: number | null): string => {
  return value ? formatToPercentage(value) : 'N/A'
}

const getRatioFormattedValue = (value: number | null): string => {
  return value ? formatToRatio(value) : 'N/A'
}

export const formatAsset = (asset: Asset): FormattedAsset => {
  return {
    about: {
      name: asset.about.name || 'N/A',
      ticker: asset.about.ticker?.toUpperCase() || 'N/A',
      sector: asset.about.sector || 'N/A',
      subSector: asset.about.subSector || 'N/A',
      averageLiquidity: getBRLFormattedValue(asset.about.averageLiquidity, 'M'),
      numberOfShares: getRatioFormattedValue(asset.about.numberOfShares),
    },
    quote: {
      price: getBRLFormattedValue(asset.quote.price),
      minPriceIn52Weeks: getBRLFormattedValue(asset.quote.minPriceIn52Weeks),
      maxPriceIn52Weeks: getBRLFormattedValue(asset.quote.maxPriceIn52Weeks),
      oscilationIn12Months: getPercentageFormattedValue(
        asset.quote.oscilationIn12Months,
      ),
      oscilationIn30Days: getPercentageFormattedValue(
        asset.quote.oscilationIn30Days,
      ),
      lastQuoteDate: asset.quote.lastQuoteDate || 'N/A',
    },
    balance: {
      assets: getBRLFormattedValue(asset.balance.assets),
      currentAssets: getBRLFormattedValue(asset.balance.currentAssets),
      enterpriseValue: getBRLFormattedValue(asset.balance.enterpriseValue),
      ebit: getBRLFormattedValue(asset.balance.ebit),
      grossDebt: getBRLFormattedValue(asset.balance.grossDebt),
      marketValue: getBRLFormattedValue(asset.balance.marketValue),
      netDebt: getBRLFormattedValue(asset.balance.netDebt),
      netIncome: getBRLFormattedValue(asset.balance.netIncome),
      netProfit: getBRLFormattedValue(asset.balance.netProfit),
      netWorth: getBRLFormattedValue(asset.balance.netWorth),
    },
    valuation: {
      dividendYield: getPercentageFormattedValue(asset.valuation.dividendYield),
      priceToProfitRatio: getRatioFormattedValue(
        asset.valuation.priceToProfitRatio,
      ),
      priceToBookRatio: getRatioFormattedValue(
        asset.valuation.priceToBookRatio,
      ),
      evToEbitRatio: getRatioFormattedValue(asset.valuation.evToEbitRatio),
      priceToEbitRatio: getRatioFormattedValue(
        asset.valuation.priceToEbitRatio,
      ),
      bookValuePerShare: getRatioFormattedValue(
        asset.valuation.bookValuePerShare,
      ),
      priceToAssets: getRatioFormattedValue(asset.valuation.priceToAssets),
      profitByShare: getRatioFormattedValue(asset.valuation.profitByShare),
      priceToCapitalRatio: getRatioFormattedValue(
        asset.valuation.priceToCapitalRatio,
      ),
      priceToLiquidAsset: getRatioFormattedValue(
        asset.valuation.priceToLiquidAsset,
      ),
    },
    debt: {
      netDebtToEquityRatio: getRatioFormattedValue(
        asset.debt.netDebtToEquityRatio,
      ),
      netDebtToEbitRatio: getRatioFormattedValue(asset.debt.netDebtToEbitRatio),
      equityToAssetsRatio: getRatioFormattedValue(
        asset.debt.equityToAssetsRatio,
      ),
      currentLiquidity: getRatioFormattedValue(asset.debt.currentLiquidity),
    },
    efficiency: {
      grossMargin: getPercentageFormattedValue(asset.efficiency.grossMargin),
      ebitMargin: getPercentageFormattedValue(asset.efficiency.ebitMargin),
      netMargin: getPercentageFormattedValue(asset.efficiency.netMargin),
    },
    profitability: {
      returnOnEquity: getPercentageFormattedValue(
        asset.profitability.returnOnEquity,
      ),
      returnOnInvestedCapital: getPercentageFormattedValue(
        asset.profitability.returnOnInvestedCapital,
      ),
      assetTurnover: getRatioFormattedValue(asset.profitability.assetTurnover),
    },
    windScore: asset.windScore,
    grahamPrice: getBRLFormattedValue(asset.grahamPrice),
  }
}
