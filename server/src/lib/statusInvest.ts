import puppeteer from 'puppeteer'

type GetStock = {
  ticker: string
  showLogs?: boolean
}

export type Stock = {
  about: {
    name: string
  }
  valuation: {
    price: number | null
    dividendYield: number | null
    changeInLast12Months: number | null
    priceToProfitRatio: number | null
    pegRatio: number | null
    priceToBookRatio: number | null
    evToEbitdaRatio: number | null
    evToEbitRatio: number | null
    priceToEbitdaRatio: number | null
    priceToEbitRatio: number | null
    bookValuePerShare: number | null
    priceToAssets: number | null
    profitByShare: number | null
    priceToSalesRatio: number | null
    priceToCapitalRatio: number | null
    priceToLiquidAsset: number | null
  }
  debt: {
    netDebtToEquityRatio: number | null
    netDebtToEbitdaRatio: number | null
    netDebtToEbitRatio: number | null
    equityToAssetsRatio: number | null
    liabilitiesToAssetsRatio: number | null
    currentLiquidity: number | null
  }
  efficiency: {
    grossMargin: number | null
    ebitdaMargin: number | null
    ebitMargin: number | null
    netMargin: number | null
  }
  profitability: {
    returnOnEquity: number | null
    returnOnAssets: number | null
    returnOnInvestedCapital: number | null
    assetTurnover: number | null
  }
  growth: {
    cagrRevenue5Years: number | null
    cagrProfits5Years: number | null
  }
}

export const onPageEvaluate = () => {
  const values = Array.from(document.querySelectorAll('.data')).map(
    (el) => el.innerHTML,
  )
  const about = {
    name: 'test',
  }
  const valuation = {
    price: values.toString(),
    dividendYield: 0,
    changeInLast12Months: 0,
    priceToProfitRatio: 0,
    pegRatio: 0,
    priceToBookRatio: 0,
    evToEbitdaRatio: 0,
    evToEbitRatio: 0,
    priceToEbitdaRatio: 0,
    priceToEbitRatio: 0,
    bookValuePerShare: 0,
    priceToAssets: 0,
    profitByShare: 0,
    priceToSalesRatio: 0,
    priceToCapitalRatio: 0,
    priceToLiquidAsset: 0,
  }
  const debt = {
    netDebtToEquityRatio: 0,
    netDebtToEbitdaRatio: 0,
    netDebtToEbitRatio: 0,
    equityToAssetsRatio: 0,
    liabilitiesToAssetsRatio: 0,
    currentLiquidity: 0,
  }
  const efficiency = {
    grossMargin: 0,
    ebitdaMargin: 0,
    ebitMargin: 0,
    netMargin: 0,
  }
  const profitability = {
    returnOnEquity: 0,
    returnOnAssets: 0,
    returnOnInvestedCapital: 0,
    assetTurnover: 0,
  }
  const growth = {
    cagrRevenue5Years: 0,
    cagrProfits5Years: 0,
  }
  return { about, valuation, debt, efficiency, profitability, growth }
}

export const StatusInvest = {
  getStock: async ({
    ticker,
    showLogs,
  }: GetStock): Promise<Stock | undefined> => {
    const log = showLogs
      ? console.log
      : () => {
          // do nothing
        }
    try {
      log(`[StatusInvest] - Getting stock data for ${ticker}`)

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions'],
      })
      log('[StatusInvest] - Browser launched')

      const page = await browser.newPage()
      log('[StatusInvest] - Page created')

      await page.setExtraHTTPHeaders({
        accept: '*/*',
        'accept-language':
          'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7,es-MX;q=0.6,es;q=0.5',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
        'sec-ch-ua':
          '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
      })
      log('[StatusInvest] - Page headers set')

      await page.goto(
        `https://www.fundamentus.com.br/detalhes.php?papel=${ticker}`,
        {
          waitUntil: 'domcontentloaded',
        },
      )
      log('[StatusInvest] - Page loaded')

      const stock = await page.evaluate(onPageEvaluate)
      log('[StatusInvest] - Stock data extracted')

      await browser.close()
      log('[StatusInvest] - Browser closed')

      return stock
    } catch (e) {
      log('[StatusInvest] - Error: ', e)
    }
  },
}
