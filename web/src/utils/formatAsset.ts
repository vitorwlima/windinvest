import { AssetResponse } from 'src/queries/useGetAsset'
import { Unit, formatToBRL } from './formatToBRL'
import { formatToPercentage } from './formatToPercentage'
import { formatToRatio } from './formatToRatio'

export type FormattedAsset = {
  ticker: string
  type: AssetResponse['type']
  liquidity: string
  windScore: AssetResponse['windScore']
  grahamPrice: string
  company: AssetResponse['company']
  quote: {
    price: string
    threeMonthChangePercent: string
    fiftyTwoWeekLow: string
    fiftyTwoWeekHigh: string
    logoUrl: string
  }
  fundamentals: {
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
  }
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

export const formatAsset = (asset: AssetResponse): FormattedAsset => {
  return {
    ticker: asset.ticker,
    type: asset.type,
    liquidity: getBRLFormattedValue(asset.liquidity, 'M'),
    company: asset.company,
    quote: {
      price: getBRLFormattedValue(asset.quote.price),
      fiftyTwoWeekLow: getBRLFormattedValue(asset.quote.fiftyTwoWeekLow),
      fiftyTwoWeekHigh: getBRLFormattedValue(asset.quote.fiftyTwoWeekHigh),
      threeMonthChangePercent: getPercentageFormattedValue(
        asset.quote.threeMonthChangePercent,
      ),
      logoUrl: asset.quote.logoUrl,
    },
    fundamentals: {
      valuation: {
        dividendYield: getPercentageFormattedValue(
          asset.fundamentals.dividendYield,
        ),
        priceToProfitRatio: getRatioFormattedValue(
          asset.fundamentals.priceToProfitRatio,
        ),
        priceToBookRatio: getRatioFormattedValue(
          asset.fundamentals.priceToBookRatio,
        ),
        evToEbitRatio: getRatioFormattedValue(asset.fundamentals.evToEbitRatio),
        priceToEbitRatio: getRatioFormattedValue(
          asset.fundamentals.priceToEbitRatio,
        ),
        bookValuePerShare: getRatioFormattedValue(
          asset.fundamentals.bookValuePerShare,
        ),
        priceToAssets: getRatioFormattedValue(asset.fundamentals.priceToAssets),
        profitByShare: getRatioFormattedValue(asset.fundamentals.profitByShare),
        priceToCapitalRatio: getRatioFormattedValue(
          asset.fundamentals.priceToCapitalRatio,
        ),
        priceToLiquidAsset: getRatioFormattedValue(
          asset.fundamentals.priceToLiquidAsset,
        ),
      },
      debt: {
        netDebtToEquityRatio: getRatioFormattedValue(
          asset.fundamentals.netDebtToEquityRatio,
        ),
        netDebtToEbitRatio: getRatioFormattedValue(
          asset.fundamentals.netDebtToEbitRatio,
        ),
        equityToAssetsRatio: getRatioFormattedValue(
          asset.fundamentals.equityToAssetsRatio,
        ),
        currentLiquidity: getRatioFormattedValue(
          asset.fundamentals.currentLiquidity,
        ),
      },
      efficiency: {
        grossMargin: getPercentageFormattedValue(
          asset.fundamentals.grossMargin,
        ),
        ebitMargin: getPercentageFormattedValue(asset.fundamentals.ebitMargin),
        netMargin: getPercentageFormattedValue(asset.fundamentals.netMargin),
      },
      profitability: {
        returnOnEquity: getPercentageFormattedValue(
          asset.fundamentals.returnOnEquity,
        ),
        returnOnInvestedCapital: getPercentageFormattedValue(
          asset.fundamentals.returnOnInvestedCapital,
        ),
        assetTurnover: getRatioFormattedValue(asset.fundamentals.assetTurnover),
      },
    },
    windScore: asset.windScore,
    grahamPrice: getBRLFormattedValue(asset.grahamPrice),
  }
}
