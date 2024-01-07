'use client'

import Link from 'next/link'
import { Spinner } from 'src/components/Spinner'
import { useGetWallet } from 'src/queries/useGetWallet'
import { formatToRatio } from 'src/utils/formatToRatio'

type Props = {
  id: string
}

export const Wallet: React.FC<Props> = ({ id }) => {
  const { data: wallet, isLoading, isError } = useGetWallet({ id })

  if (isLoading || !wallet) {
    return (
      <div className="mt-32">
        <Spinner />
      </div>
    )
  }

  if (isError || wallet.error === 'Not Found' || wallet.error === 'Forbidden') {
    return (
      <p className="mt-32 text-center text-3xl font-bold text-white">
        Carteira não encontrada.
      </p>
    )
  }

  return (
    <main className="mx-auto mt-4 max-w-6xl px-4">
      <h2 className="mb-4 text-2xl font-bold text-white">{wallet.title}</h2>
      <p>{wallet.description}</p>

      <ol className="mt-8 flex flex-col gap-2">
        {wallet.assets.map((asset, i) => (
          <li key={asset.ticker}>
            <Link
              href={`/ativos/${asset.ticker}`}
              className="group flex items-center justify-between rounded-md bg-gray-950/40 p-4 transition-colors hover:bg-green-500 focus:bg-green-500 focus:outline-none"
            >
              <section className="flex items-center gap-8">
                <span className="w-6 text-lg font-bold text-green-500 group-hover:text-gray-50 group-focus:text-gray-50">
                  {i + 1}
                </span>
                <div className="flex flex-col">
                  <strong>{asset.ticker}</strong>
                  <p className="text-xs">{asset.company.fantasyName}</p>
                </div>
              </section>
              <section>
                <data
                  value={asset.windFinalScore}
                  className="font-bold text-green-500 group-hover:text-gray-50 group-focus:text-gray-50"
                >
                  {formatToRatio(asset.windFinalScore)}
                </data>
              </section>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
