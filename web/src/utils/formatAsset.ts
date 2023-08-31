import { Asset } from 'src/queries/useGetAsset'
import { formatToBRL } from './formatToBRL'
import { formatToPercentage } from './formatToPercentage'
import { formatToRatio } from './formatToRatio'

export type FormattedAsset = {
  about: {
    name: string
  }
  valuation: {
    price: string
    dividendYield: string
    changeInLast12Months: string
    priceToProfitRatio: string
    pegRatio: string
    priceToBookRatio: string
    evToEbitdaRatio: string
    evToEbitRatio: string
    priceToEbitdaRatio: string
    priceToEbitRatio: string
    bookValuePerShare: string
    priceToAssets: string
    profitByShare: string
    priceToSalesRatio: string
    priceToCapitalRatio: string
    priceToLiquidAsset: string
  }
  debt: {
    netDebtToEquityRatio: string
    netDebtToEbitdaRatio: string
    netDebtToEbitRatio: string
    equityToAssetsRatio: string
    liabilitiesToAssetsRatio: string
    currentLiquidity: string
  }
  efficiency: {
    grossMargin: string
    ebitdaMargin: string
    ebitMargin: string
    netMargin: string
  }
  profitability: {
    returnOnEquity: string
    returnOnAssets: string
    returnOnInvestedCapital: string
    assetTurnover: string
  }
  growth: {
    cagrRevenue5Years: string
    cagrProfits5Years: string
  }
}

const getBRLFormattedValue = (value: number | null): string => {
  return value ? formatToBRL(value) : 'N/A'
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
      name: asset.about.name,
    },
    valuation: {
      price: getBRLFormattedValue(asset.valuation.price),
      dividendYield: getPercentageFormattedValue(asset.valuation.dividendYield),
      changeInLast12Months: getPercentageFormattedValue(
        asset.valuation.changeInLast12Months,
      ),
      priceToProfitRatio: getRatioFormattedValue(
        asset.valuation.priceToProfitRatio,
      ),
      pegRatio: getRatioFormattedValue(asset.valuation.pegRatio),
      priceToBookRatio: getRatioFormattedValue(
        asset.valuation.priceToBookRatio,
      ),
      evToEbitdaRatio: getRatioFormattedValue(asset.valuation.evToEbitdaRatio),
      evToEbitRatio: getRatioFormattedValue(asset.valuation.evToEbitRatio),
      priceToEbitdaRatio: getRatioFormattedValue(
        asset.valuation.priceToEbitdaRatio,
      ),
      priceToEbitRatio: getRatioFormattedValue(
        asset.valuation.priceToEbitRatio,
      ),
      bookValuePerShare: getRatioFormattedValue(
        asset.valuation.bookValuePerShare,
      ),
      priceToAssets: getRatioFormattedValue(asset.valuation.priceToAssets),
      profitByShare: getRatioFormattedValue(asset.valuation.profitByShare),
      priceToSalesRatio: getRatioFormattedValue(
        asset.valuation.priceToSalesRatio,
      ),
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
      netDebtToEbitdaRatio: getRatioFormattedValue(
        asset.debt.netDebtToEbitdaRatio,
      ),
      netDebtToEbitRatio: getRatioFormattedValue(asset.debt.netDebtToEbitRatio),
      equityToAssetsRatio: getRatioFormattedValue(
        asset.debt.equityToAssetsRatio,
      ),
      liabilitiesToAssetsRatio: getRatioFormattedValue(
        asset.debt.liabilitiesToAssetsRatio,
      ),
      currentLiquidity: getRatioFormattedValue(asset.debt.currentLiquidity),
    },
    efficiency: {
      grossMargin: getPercentageFormattedValue(asset.efficiency.grossMargin),
      ebitdaMargin: getPercentageFormattedValue(asset.efficiency.ebitdaMargin),
      ebitMargin: getPercentageFormattedValue(asset.efficiency.ebitMargin),
      netMargin: getPercentageFormattedValue(asset.efficiency.netMargin),
    },
    profitability: {
      returnOnEquity: getPercentageFormattedValue(
        asset.profitability.returnOnEquity,
      ),
      returnOnAssets: getPercentageFormattedValue(
        asset.profitability.returnOnAssets,
      ),
      returnOnInvestedCapital: getPercentageFormattedValue(
        asset.profitability.returnOnInvestedCapital,
      ),
      assetTurnover: getRatioFormattedValue(asset.profitability.assetTurnover),
    },
    growth: {
      cagrRevenue5Years: getPercentageFormattedValue(
        asset.growth.cagrRevenue5Years,
      ),
      cagrProfits5Years: getPercentageFormattedValue(
        asset.growth.cagrProfits5Years,
      ),
    },
  }
}
