import { B3Scraper } from 'b3-scraper'
import { AllStocks } from 'b3-scraper/dist/@types/allStocks'
import { Stock } from 'b3-scraper/dist/@types/stock'
import { differenceInWeeks } from 'date-fns'
import { WindScore, getWindScore } from 'src/lib/getWindScore'
import { prisma } from 'src/lib/prisma'

const formatBRLDateToISO = (date: string | null) => {
  if (!date) return new Date()

  const [day, month, year] = date.split('/')
  return new Date(`${month}/${day}/${year}`)
}

const handleNewAsset = async (
  stockInitialData: AllStocks[number],
  stock: Stock,
  windScore: WindScore,
  stockIsMoreThan2WeeksNotUpdated: boolean,
) => {
  if (stockIsMoreThan2WeeksNotUpdated) {
    console.log(
      `Skipping asset ${stockInitialData.ticker} as it's no longer active`,
    )

    return
  }

  const asset = await prisma.asset.create({
    data: {
      ticker: stockInitialData.ticker.toUpperCase(),
      companyName: stockInitialData.companyName,
      fantasyName: stockInitialData.fantasyName,
      sector: stock.about.sector || 'N/A',
      subSector: stock.about.subSector || 'N/A',
      marketValue: stock.balance.marketValue,
      netIncome: stock.balance.netIncome,
    },
  })
  console.log(`Created asset for ${stockInitialData.ticker}`)

  await prisma.windScore.create({
    data: {
      assetId: asset.id,
      debt: getWindScoreFormattedNumber(windScore.debt),
      efficiency: getWindScoreFormattedNumber(windScore.efficiency),
      profitability: getWindScoreFormattedNumber(windScore.profitability),
      valuation: getWindScoreFormattedNumber(windScore.valuation),
      windFinalScore:
        getWindScoreFormattedNumber(windScore.windFinalScore) ?? 0,
    },
  })

  console.log(`Created windscore for ${stockInitialData.ticker}`)
}

const handleExistingAsset = async (
  assetId: string,
  stockInitialData: AllStocks[number],
  stock: Stock,
  windScoreExists: boolean,
  windScore: WindScore,
  stockIsMoreThan2WeeksNotUpdated: boolean,
) => {
  if (stockIsMoreThan2WeeksNotUpdated) {
    if (windScoreExists) {
      await prisma.windScore.delete({
        where: {
          assetId,
        },
      })
      console.log(`Deleted windscore for ${stockInitialData.ticker}`)
    }

    await prisma.asset.delete({
      where: {
        id: assetId,
      },
    })
    console.log(`Deleted asset for ${stockInitialData.ticker}`)

    return
  }

  const asset = await prisma.asset.update({
    where: {
      id: assetId,
    },
    data: {
      ticker: stockInitialData.ticker.toUpperCase(),
      companyName: stockInitialData.companyName,
      fantasyName: stockInitialData.fantasyName,
      sector: stock.about.sector || 'N/A',
      subSector: stock.about.subSector || 'N/A',
      marketValue: stock.balance.marketValue,
      netIncome: stock.balance.netIncome,
    },
  })
  console.log(`Updated asset for ${stockInitialData.ticker}`)

  if (windScoreExists) {
    await prisma.windScore.update({
      where: {
        assetId: asset.id,
      },
      data: {
        debt: getWindScoreFormattedNumber(windScore.debt),
        efficiency: getWindScoreFormattedNumber(windScore.efficiency),
        profitability: getWindScoreFormattedNumber(windScore.profitability),
        valuation: getWindScoreFormattedNumber(windScore.valuation),
        windFinalScore:
          getWindScoreFormattedNumber(windScore.windFinalScore) ?? 0,
      },
    })
    console.log(`Updated windscore for ${stockInitialData.ticker}`)

    return
  }

  await prisma.windScore.create({
    data: {
      assetId: asset.id,
      debt: getWindScoreFormattedNumber(windScore.debt),
      efficiency: getWindScoreFormattedNumber(windScore.efficiency),
      profitability: getWindScoreFormattedNumber(windScore.profitability),
      valuation: getWindScoreFormattedNumber(windScore.valuation),
      windFinalScore:
        getWindScoreFormattedNumber(windScore.windFinalScore) ?? 0,
    },
  })
  console.log(`Created windscore for ${stockInitialData.ticker}`)
}

const getWindScoreFormattedNumber = (number: number | null) => {
  return Number.isNaN(number) ? null : number
}

const updateAssets = async () => {
  const allStocks = await B3Scraper.getAllStocks()

  if (!allStocks) {
    console.log('Could not retrieve stocks')
    return
  }

  for (const stockInitialData of allStocks) {
    console.log(`Getting stock ${stockInitialData.ticker}`)
    const stock = await B3Scraper.getStock({ ticker: stockInitialData.ticker })

    if (!stock) {
      console.log(`Could not retrieve stock ${stockInitialData.ticker}`)
      continue
    }

    const stockIsMoreThan2WeeksNotUpdated =
      differenceInWeeks(
        new Date(),
        formatBRLDateToISO(stock.quote.lastQuoteDate),
      ) > 2

    const assetExists = await prisma.asset.findUnique({
      where: {
        ticker: stockInitialData.ticker.toUpperCase(),
      },
    })

    const windScoreExists =
      !!assetExists &&
      Boolean(
        await prisma.windScore.findUnique({
          where: {
            assetId: assetExists.id,
          },
        }),
      )

    const windScore = getWindScore(stock)

    if (assetExists) {
      handleExistingAsset(
        assetExists.id,
        stockInitialData,
        stock,
        windScoreExists,
        windScore,
        stockIsMoreThan2WeeksNotUpdated,
      )

      continue
    }

    handleNewAsset(
      stockInitialData,
      stock,
      windScore,
      stockIsMoreThan2WeeksNotUpdated,
    )
  }
}

updateAssets()
