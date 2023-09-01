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
  windScore: {
    valuation: number | null
    efficiency: number | null
    debt: number | null
    profitability: number | null
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
  }
}
