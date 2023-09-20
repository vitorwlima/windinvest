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
      data: asset.quote.minPriceIn52Weeks,
    },
    {
      title: 'Máxima (52Sem)',
      data: asset.quote.maxPriceIn52Weeks,
    },
    {
      title: 'Valorização (12M)',
      data: asset.valuation.priceToBookRatio,
    },
    {
      title: 'Liquidez',
      data: asset.about.averageLiquidity,
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
