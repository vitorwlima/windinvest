import { FormattedAsset } from 'src/utils/formatAsset'
import { DataCard } from './DataCard'

type Props = {
  asset: FormattedAsset
}

export const AssetIntroductionData: React.FC<Props> = ({ asset }) => {
  const cardsData = [
    {
      title: 'Cotação',
      data: asset.quote.price,
    },
    {
      title: 'Mínima (52Sem)',
      data: asset.quote.fiftyTwoWeekLow,
    },
    {
      title: 'Máxima (52Sem)',
      data: asset.quote.fiftyTwoWeekHigh,
    },
    {
      title: 'Variação (3M)',
      data: asset.quote.threeMonthChangePercent,
    },
    {
      title: 'Liquidez',
      data: asset.liquidity,
    },
  ]

  return (
    <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-5">
      {cardsData.map(({ title, data }, index) => (
        <DataCard
          key={title}
          title={title}
          data={data}
          isLast={index === cardsData.length - 1}
        />
      ))}
    </section>
  )
}
