import { AssetHeader } from 'src/components/AssetHeader'
import { DataCard } from 'src/components/DataCard'

type PageParams = {
  params: {
    asset: string
  }
}

const mockData = [
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
    data: '2,55',
  },
  {
    title: 'P/VP',
    data: '1,08',
  },
  {
    title: 'DY',
    data: '29,79%',
  },
]

const AssetPage: React.FC<PageParams> = ({ params: { asset } }) => {
  return (
    <main>
      <AssetHeader
        asset={asset}
        companyName="PETROLEO BRASILEIRO S.A. PETROBRAS"
      />

      <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-5">
        {mockData.map(({ title, data }) => (
          <DataCard key={title} title={title} data={data} />
        ))}
      </section>
    </main>
  )
}

export default AssetPage
