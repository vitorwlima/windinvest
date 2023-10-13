import { getPuppeteerPage } from './getPuppeteerPage'

export const getAllStockTickers = async () => {
  const { browser, page } = await getPuppeteerPage()

  await page.goto('https://www.fundamentus.com.br/detalhes.php', {
    waitUntil: 'domcontentloaded',
  })

  const allStockTickers = await page.evaluate(() => {
    const values = Array.from(document.querySelectorAll('tr'))
      .map((el) =>
        Array.from(el.querySelectorAll('td')).map((el) =>
          (el.textContent as string).replace('\n', '').trim(),
        ),
      )
      .filter((ar) => ar.length > 0)

    const tickers = values.map((ar) => ar[0])

    return tickers
  })

  await browser.close()

  return allStockTickers
}
