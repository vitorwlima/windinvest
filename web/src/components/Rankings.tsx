'use client'

import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useGetRanking } from 'src/queries/useGetRanking'
import { formatToBRL } from 'src/utils/formatToBRL'
import { Spinner } from './Spinner'

export const Rankings: React.FC = () => {
  const { data, isLoading } = useGetRanking()

  if (data === undefined || isLoading || !data.ok) {
    return <Spinner />
  }

  const { data: ranking } = data

  const rankings = [
    {
      title: 'Maiores Valor de Mercado',
      data: ranking.greatestMarketValue,
    },
    {
      title: 'Maiores Receitas Líquidas',
      data: ranking.greatestIncome,
    },
  ]

  const getValue = (asset: { marketValue?: number; netIncome?: number }) => {
    const valueInBi = ((asset?.marketValue || asset?.netIncome) as number) / 1e9

    return formatToBRL(valueInBi)
  }

  return (
    <section className="bg-neutral-800 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
          <p>Rankings de Ações</p>
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rankings.map((data) => (
            <div
              key={data.title}
              className="overflow-hidden rounded-xl border border-neutral-500"
            >
              <header className="bg-green-500 p-4 text-center">
                <h4 className="text-xl font-bold">{data.title}</h4>
              </header>

              <div className="flex flex-col">
                {data.data.map((asset) => (
                  <Link
                    key={asset.ticker}
                    href={`/ativos/${asset.ticker}`}
                    className="flex items-center justify-between px-8 py-2 transition-colors hover:bg-green-500"
                  >
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">
                        {asset.ticker.toUpperCase()}
                      </p>
                      <p className="text-sm">{asset.fantasyName}</p>
                    </div>
                    <strong>{getValue(asset)} B</strong>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
