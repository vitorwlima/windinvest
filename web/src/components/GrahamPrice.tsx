import clsx from 'clsx'
import { MoveRight } from 'lucide-react'
import { AssetResponse } from 'src/queries/useGetAsset'
import { getBRLFormattedValue } from 'src/utils/formatAsset'
import { AssetDataContainer } from './AssetDataContainer'

type Props = {
  asset: AssetResponse
}

type GrahamResults = 'undefined' | 'fair' | 'lessThan' | 'greaterThan'
type GrahamContent = {
  result: React.ReactNode
  className: string
}

const grahamContent: Record<GrahamResults, GrahamContent> = {
  undefined: {
    result: (
      <>
        Preço justo de Graham <strong>não definido</strong>
      </>
    ),
    className: 'text-gray-500',
  },
  fair: {
    result: (
      <>
        Ação está no preço <strong>justo</strong> de Graham
      </>
    ),
    className: 'text-gray-500',
  },
  lessThan: {
    result: (
      <>
        Ação está <strong>abaixo</strong> do preço justo de Graham
      </>
    ),
    className: 'text-green-500',
  },
  greaterThan: {
    result: (
      <>
        Ação está <strong>acima</strong> do preço justo de Graham
      </>
    ),
    className: 'text-red-500',
  },
}

const grahamPriceDescription = {
  text: 'Preço justo calculado com base no método do economista Benjamin Graham, que considera o VPA e LPA do ativo.',
}

export const GrahamPrice: React.FC<Props> = ({ asset }: Props) => {
  const {
    grahamPrice,
    quote: { price },
  } = asset

  const result: GrahamResults =
    grahamPrice === null || price === null
      ? 'undefined'
      : grahamPrice === price
      ? 'fair'
      : price > grahamPrice
      ? 'greaterThan'
      : 'lessThan'
  const content = grahamContent[result]

  return (
    <AssetDataContainer
      title="PREÇO JUSTO DE GRAHAM"
      description={grahamPriceDescription}
    >
      <section className="mx-auto flex flex-col items-center gap-4 p-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span>Preço justo</span>
            <strong className="text-xl">
              {getBRLFormattedValue(grahamPrice)}
            </strong>
          </div>
          <MoveRight className={clsx('h-8 w-8', content.className)} />
          <div className="flex flex-col gap-1">
            <span>Preço atual</span>
            <strong className="text-xl">{getBRLFormattedValue(price)}</strong>
          </div>
        </div>

        <p className="text-center tracking-wide">{content.result}</p>
      </section>
    </AssetDataContainer>
  )
}
