'use client'

import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useGetRanking } from 'src/queries/useGetRanking'
import { formatToBRL } from 'src/utils/formatToBRL'

export const Rankings: React.FC = () => {
  const { data, isLoading } = useGetRanking()

  if (!data || isLoading) {
    const rankings = [
      {
        title: 'Maiores Valor de Mercado',
        data: [1, 2, 3, 4, 5],
      },
      {
        title: 'Maiores Receitas Líquidas',
        data: [1, 2, 3, 4, 5],
      },
    ]

    return (
      <section className="mx-auto max-w-6xl px-4 py-8">
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
                {data.data.map((_asset, i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center justify-between bg-neutral-800 px-8 py-2 transition-colors"
                  >
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">&#12644;</p>
                      <p className="text-sm">&#12644;</p>
                    </div>
                    <strong>&#12644;</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const rankings = [
    {
      title: 'Maiores Valor de Mercado',
      data: data.greatestMarketValue,
    },
    {
      title: 'Maiores Valor de Empresa',
      data: data.greatestEnterpriseValue,
    },
  ]

  const getValue = (company: {
    marketValue?: number | null
    enterpriseValue?: number | null
  }) => {
    if (!company?.marketValue && !company?.enterpriseValue) {
      return 'N/A'
    }

    const valueInBi =
      ((company?.marketValue || company?.enterpriseValue) as number) / 1e9

    return formatToBRL(valueInBi)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
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
                  className="flex items-center justify-between px-8 py-2 transition-colors hover:bg-green-500 focus:bg-green-500 focus:outline-none"
                >
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">
                      {asset.ticker.toUpperCase()}
                    </p>
                    <p className="text-sm">{asset.company.fantasyName}</p>
                  </div>
                  <strong>{getValue(asset.company)} B</strong>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
