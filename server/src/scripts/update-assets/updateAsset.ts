import { Asset, AssetType } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { getWindScore } from 'src/windscore/getWindScore'
import { Stock } from './getStock'
import { log } from './log'

export const handleUpdateAsset = async (assetToUpdate: Asset, stock: Stock) => {
  log('Updating asset...')

  const asset = await prisma.asset.update({
    where: {
      id: assetToUpdate.id,
    },
    data: {
      liquidity: stock.info.liquidity,
      ticker: stock.info.ticker,
      type: stock.info.type as AssetType,
    },
  })

  const company = await prisma.company.update({
    where: {
      cnpj: stock.company.cnpj,
    },
    data: {
      companyName: stock.company.companyName,
      fantasyName: stock.company.fantasyName,
      marketValue: stock.company.marketValue,
      enterpriseValue: stock.company.enterpriseValue,
      netWorth: stock.company.netWorth,
      grossDebt: stock.company.grossDebt,
      profitable: stock.company.profitable,
    },
  })

  const fundamentals = await prisma.fundamentals.update({
    where: {
      assetId: asset.id,
    },
    data: {
      dividendYield: stock.fundamentals.dividendYield,
      priceToProfitRatio: stock.fundamentals.priceToProfitRatio,
      priceToBookRatio: stock.fundamentals.priceToBookRatio,
      evToEbitRatio: stock.fundamentals.evToEbitRatio,
      priceToEbitRatio: stock.fundamentals.priceToEbitRatio,
      bookValuePerShare: stock.fundamentals.bookValuePerShare,
      priceToAssets: stock.fundamentals.priceToAssets,
      profitByShare: stock.fundamentals.profitByShare,
      priceToCapitalRatio: stock.fundamentals.priceToCapitalRatio,
      priceToLiquidAsset: stock.fundamentals.priceToLiquidAsset,
      netDebtToEquityRatio: stock.fundamentals.netDebtToEquityRatio,
      netDebtToEbitRatio: stock.fundamentals.netDebtToEbitRatio,
      equityToAssetsRatio: stock.fundamentals.equityToAssetsRatio,
      currentLiquidity: stock.fundamentals.currentLiquidity,
      grossMargin: stock.fundamentals.grossMargin,
      ebitMargin: stock.fundamentals.ebitMargin,
      netMargin: stock.fundamentals.netMargin,
      returnOnEquity: stock.fundamentals.returnOnEquity,
      returnOnInvestedCapital: stock.fundamentals.returnOnInvestedCapital,
      assetTurnover: stock.fundamentals.assetTurnover,
    },
  })

  const windScore = getWindScore({
    asset,
    company,
    fundamentals,
  })

  await prisma.windScore.update({
    where: {
      assetId: asset.id,
    },
    data: {
      debt: windScore.debt,
      efficiency: windScore.efficiency,
      profitability: windScore.profitability,
      valuation: windScore.valuation,
      windFinalScore: windScore.windFinalScore,
      checklistDebt: windScore.holderChecklist.debt,
      checklistLiquidity: windScore.holderChecklist.liquidity,
      checklistProfit: windScore.holderChecklist.profit,
      checklistRoe: windScore.holderChecklist.roe,
    },
  })

  log('Asset successfully updated.')
}
