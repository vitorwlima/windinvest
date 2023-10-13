import { AssetType, Fundamentals } from '@prisma/client'
import { getPuppeteerPage } from './getPuppeteerPage'

export type FundamentalsValues = Pick<
  Fundamentals,
  | 'dividendYield'
  | 'priceToProfitRatio'
  | 'priceToBookRatio'
  | 'evToEbitRatio'
  | 'priceToEbitRatio'
  | 'bookValuePerShare'
  | 'priceToAssets'
  | 'profitByShare'
  | 'priceToCapitalRatio'
  | 'priceToLiquidAsset'
  | 'netDebtToEquityRatio'
  | 'netDebtToEbitRatio'
  | 'equityToAssetsRatio'
  | 'currentLiquidity'
  | 'grossMargin'
  | 'ebitMargin'
  | 'netMargin'
  | 'returnOnEquity'
  | 'returnOnInvestedCapital'
  | 'assetTurnover'
>

export type Stock = {
  lastUpdatedDate: string
  info: {
    ticker: string
    type: AssetType | 'BDR'
    liquidity: number | null
  }
  company: {
    sector: string
    subsector: string
    companyName: string
    fantasyName: string
    cnpj: string
    marketValue: number | null
    enterpriseValue: number | null
    netWorth: number | null
    grossDebt: number | null
    profitable: boolean | null
  }
  fundamentals: FundamentalsValues
}

export const getStock = async (ticker: string): Promise<Stock | null> => {
  const { browser, page } = await getPuppeteerPage()

  await page.goto(`https://statusinvest.com.br/acoes/${ticker}`, {
    waitUntil: 'domcontentloaded',
  })

  const stock = await page.evaluate(async () => {
    const is404 = document
      .querySelector('span.mb-1')
      ?.textContent?.includes('OPS. . .')

    if (is404) {
      return null
    }

    const dividendYield = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(1)>div>div>strong',
    )?.textContent
    const priceToProfitRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(2)>div>div>strong',
    )?.textContent
    const priceToBookRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(4)>div>div>strong',
    )?.textContent
    const evToEbitRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(6)>div>div>strong',
    )?.textContent
    const priceToEbitRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(8)>div>div>strong',
    )?.textContent
    const bookValuePerShare = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(9)>div>div>strong',
    )?.textContent
    const priceToAssets = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(10)>div>div>strong',
    )?.textContent
    const profitByShare = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(11)>div>div>strong',
    )?.textContent
    const priceToCapitalRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(13)>div>div>strong',
    )?.textContent
    const priceToLiquidAsset = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(1)>div>div:nth-child(14)>div>div>strong',
    )?.textContent

    const netDebtToEquityRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(2)>div>div:nth-child(1)>div>div>strong',
    )?.textContent
    const netDebtToEbitRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(2)>div>div:nth-child(3)>div>div>strong',
    )?.textContent
    const equityToAssetsRatio = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(2)>div>div:nth-child(4)>div>div>strong',
    )?.textContent
    const currentLiquidity = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(2)>div>div:nth-child(6)>div>div>strong',
    )?.textContent

    const grossMargin = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(3)>div>div:nth-child(1)>div>div>strong',
    )?.textContent
    const ebitMargin = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(3)>div>div:nth-child(3)>div>div>strong',
    )?.textContent
    const netMargin = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(3)>div>div:nth-child(4)>div>div>strong',
    )?.textContent

    const returnOnEquity = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(4)>div>div:nth-child(1)>div>div>strong',
    )?.textContent
    const returnOnInvestedCapital = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(4)>div>div:nth-child(3)>div>div>strong',
    )?.textContent
    const assetTurnover = document.querySelector(
      'div.indicator-today-container>div>div:nth-child(4)>div>div:nth-child(4)>div>div>strong',
    )?.textContent

    const type = document.querySelector(
      'div.top-info-md-3>div:nth-child(1)>div>div>strong',
    )?.textContent
    const ticker = document.querySelector(
      'ol.main-breadcrumb>li:nth-child(3)>a>span',
    )?.textContent as string
    const liquidity = document.querySelector(
      'div.top-info-md-3>div:nth-child(3)>div>div>div>strong',
    )?.textContent

    const sector = document.querySelector(
      'div#company-section>div:nth-child(1)>div>div:nth-child(3)>div>div:nth-child(1)>div>div>div>a>strong',
    )?.textContent
    const subsector = document.querySelector(
      'div#company-section>div:nth-child(1)>div>div:nth-child(3)>div>div:nth-child(2)>div>div>div>a>strong',
    )?.textContent
    const companyName = document.querySelector('span.text-main-green-dark')
      ?.textContent
    const fantasyName = document.querySelector('h1.lh-4>small')?.textContent
    const cnpj = document.querySelector('small.fs-4')?.textContent
    const marketValue = document.querySelector(
      'div.info-3>div:nth-child(7)>div>div>strong',
    )?.textContent
    const enterpriseValue = document.querySelector(
      'div.info-3>div:nth-child(8)>div>div>strong',
    )?.textContent
    const netWorth = document.querySelector(
      'div.info-3>div:nth-child(1)>div>div>strong',
    )?.textContent
    const grossDebt = document.querySelector(
      'div.info-3>div:nth-child(4)>div>div>strong',
    )?.textContent

    const info = {
      type: (type
        ? type.toUpperCase()
        : ticker.slice(-1) === '1'
        ? 'UNIT'
        : 'OTHER') as AssetType,
      ticker: ticker?.toUpperCase(),
      liquidity: liquidity
        ? Number(liquidity.replaceAll('.', '').replaceAll(',', '.').trim())
        : null,
    }

    const company = {
      sector: sector ?? 'N/A',
      subsector: subsector ?? 'N/A',
      companyName: companyName as string,
      fantasyName: fantasyName as string,
      cnpj: cnpj as string,
      marketValue: marketValue
        ? Number(marketValue.replaceAll('.', '').replaceAll(',', '.').trim())
        : null,
      enterpriseValue: enterpriseValue
        ? Number(
            enterpriseValue.replaceAll('.', '').replaceAll(',', '.').trim(),
          )
        : null,
      netWorth: netWorth
        ? Number(netWorth.replaceAll('.', '').replaceAll(',', '.').trim())
        : null,
      grossDebt: grossDebt
        ? Number(grossDebt.replaceAll('.', '').replaceAll(',', '.').trim())
        : null,
      profitable: true,
    }

    const rawFundamentals = {
      dividendYield,
      priceToProfitRatio,
      priceToBookRatio,
      evToEbitRatio,
      priceToEbitRatio,
      bookValuePerShare,
      priceToAssets,
      profitByShare,
      priceToCapitalRatio,
      priceToLiquidAsset,

      netDebtToEquityRatio,
      netDebtToEbitRatio,
      equityToAssetsRatio,
      currentLiquidity,

      grossMargin,
      ebitMargin,
      netMargin,

      returnOnEquity,
      returnOnInvestedCapital,
      assetTurnover,
    }

    const fundamentals = Object.fromEntries(
      Object.entries(rawFundamentals).map(([key, value]) => {
        const invalidValues = ['-', '-%']
        if (!value || invalidValues.includes(value)) {
          return [key, null]
        }

        const formattedValue = value
          .replaceAll('.', '')
          .replaceAll(',', '.')
          .replace('%', '')
          .trim()

        return [key, Number(formattedValue)]
      }),
    ) as FundamentalsValues

    const [day, month, year] = document
      .querySelector(
        'div.paper>div:nth-child(13)>div:nth-child(1)>div:nth-child(1)>small>strong',
      )
      ?.textContent?.split('/') ?? ['01', '10', '2000']
    const lastUpdatedDate = `${year}-${month}-${day}`

    return { lastUpdatedDate, company, info, fundamentals }
  })

  await browser.close()

  return stock
}
