'use client'

import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { useGetRanking } from 'src/queries/useGetRanking'
import { formatToBRL } from 'src/utils/formatToBRL'

export const Rankings: React.FC = () => {
  const { data, isLoading } = useGetRanking()

  if (data === undefined || isLoading || !data.ok) {
    return (
      <section className="bg-neutral-800 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold">Rankings de Ações</h2>

          <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map((data) => (
              <div
                key={data}
                className="rounded-xl border border-neutral-500 p-8"
              >
                <h4 className="mb-4 text-xl font-bold">
                  <Skeleton />
                </h4>

                <div className="flex flex-col gap-2">
                  {[1, 2, 3, 4, 5].map((asset) => (
                    <div
                      key={asset}
                      className="flex items-center justify-between rounded-xl bg-neutral-100 p-4 text-neutral-800"
                    >
                      <div className="flex flex-col">
                        <p className="text-lg font-bold">
                          <Skeleton />
                        </p>
                        <p className="text-sm">
                          <Skeleton />
                        </p>
                      </div>
                      <strong>
                        <Skeleton />
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
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

  const getValue = (fundamental: {
    marketValue?: number
    netIncome?: number
  }) => {
    const valueInBi =
      ((fundamental?.marketValue || fundamental?.netIncome) as number) / 1e9

    return formatToBRL(valueInBi)
  }

  return (
    <section className="bg-neutral-800 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-2xl font-bold">Rankings de Ações</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rankings.map((data) => (
            <div
              key={data.title}
              className="rounded-xl border border-neutral-500 p-8"
            >
              <h4 className="mb-4 text-xl font-bold">{data.title}</h4>

              <div className="flex flex-col gap-2">
                {data.data.map((asset) => (
                  <Link
                    key={asset.ticker}
                    href={`/ativos/${asset.ticker}`}
                    className="flex items-center justify-between rounded-xl bg-neutral-100 p-4 text-neutral-800"
                  >
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">
                        {asset.ticker.toUpperCase()}
                      </p>
                      <p className="text-sm">{asset.fantasyName}</p>
                    </div>
                    <strong>{getValue(asset.fundamental)} B</strong>
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
