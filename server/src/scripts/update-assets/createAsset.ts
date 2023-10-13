import { AssetType } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { getWindScore } from 'src/windscore/getWindScore'
import { Stock } from './getStock'
import { log } from './log'

export const handleCreateAsset = async (stock: Stock) => {
  log('Creating asset...')

  let company = await prisma.company.findFirst({
    where: {
      cnpj: stock.company.cnpj,
    },
  })

  if (!company) {
    log('Creating company...')

    const sector =
      (await prisma.sector.findFirst({
        where: {
          name: stock.company.sector,
        },
      })) ||
      (await prisma.sector.create({
        data: {
          name: stock.company.sector,
        },
      }))
    const subsector =
      (await prisma.subsector.findFirst({
        where: {
          name: stock.company.subsector,
        },
      })) ||
      (await prisma.subsector.create({
        data: {
          name: stock.company.subsector,
          sectorId: sector.id,
        },
      }))

    company = await prisma.company.create({
      data: {
        cnpj: stock.company.cnpj,
        companyName: stock.company.companyName,
        fantasyName: stock.company.fantasyName,
        sectorId: sector.id,
        subsectorId: subsector.id,
        marketValue: stock.company.marketValue,
        enterpriseValue: stock.company.enterpriseValue,
        netWorth: stock.company.netWorth,
        grossDebt: stock.company.grossDebt,
        profitable: stock.company.profitable,
      },
    })
  }

  const asset = await prisma.asset.create({
    data: {
      liquidity: stock.info.liquidity,
      ticker: stock.info.ticker,
      type: stock.info.type as AssetType,
      companyId: company.id,
    },
  })

  const fundamentals = await prisma.fundamentals.create({
    data: {
      assetId: asset.id,
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

  await prisma.windScore.create({
    data: {
      assetId: asset.id,
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

  const highestWindFinalScore = Math.max(
    company.highestWindFinalScore ?? windScore.windFinalScore,
    windScore.windFinalScore,
  )

  await prisma.company.update({
    where: {
      id: company.id,
    },
    data: {
      highestWindFinalScore,
    },
  })

  log('Asset successfully created.')
}
