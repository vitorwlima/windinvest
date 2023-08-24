'use client'

import { AssetHeader } from 'src/components/AssetHeader'
import { DataCard } from 'src/components/DataCard'
import { useGetAsset } from 'src/queries/useGetAsset'

type PageParams = {
  params: {
    ticker: string
  }
}

const AssetPage: React.FC<PageParams> = ({ params: { ticker } }) => {
  const { data, isLoading } = useGetAsset({ ticker })

  if (isLoading || data === undefined) {
    return <div>Carregando...</div>
  }

  if (!data.ok) {
    return <div>Ativo não encontrado.</div>
  }

  const initialCardsData = [
    {
      title: 'Cotação',
      data: 'R$ 21,61',
    },
    {
      title: 'Valorização (12M)',
      data: '18,04%',
    },
    {
      title: 'P/L',
      data: data.data.marketRatio.price_earnings,
    },
    {
      title: 'P/VP',
      data: data.data.marketRatio.price_to_book,
    },
    {
      title: 'DY',
      data: '29,79%',
    },
  ]

  return (
    <main>
      <AssetHeader
        ticker={data.data.marketRatio.ticker}
        companyName={data.data.company.name}
      />

      <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-5">
        {initialCardsData.map(({ title, data }) => (
          <DataCard key={title} title={title} data={data} />
        ))}
      </section>
    </main>
  )
}

export default AssetPage
