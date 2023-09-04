import {
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { Asset } from 'src/queries/useGetAsset'
import { getBRLFormattedValue } from 'src/utils/formatAsset'

type Props = {
  asset: Asset
}

type GrahamResults = 'undefined' | 'fair' | 'lessThan' | 'greaterThan'
type GrahamContent = {
  result: string
  className: string
}

const grahamContent: Record<GrahamResults, GrahamContent> = {
  undefined: {
    result: 'Preço justo de Graham não definido',
    className: 'text-neutral-500',
  },
  fair: {
    result: 'Ação está no preço justo de Graham',
    className: 'text-neutral-500',
  },
  lessThan: {
    result: 'Ação está abaixo do preço justo de Graham',
    className: 'text-green-500',
  },
  greaterThan: {
    result: 'Ação está acima do preço justo de Graham',
    className: 'text-red-500',
  },
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
    <div className="mx-auto mt-12 grid max-w-6xl rounded-2xl rounded-t-none border-t-4 border-green-500 bg-neutral-800 pt-4">
      <header className="border-b border-neutral-500">
        <h3 className="px-4 pb-4 text-2xl font-bold">Preço justo de Graham</h3>
      </header>

      <section className="mx-auto flex flex-col items-center gap-2 p-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm">Preço justo</span>
            <strong className="text-xl">
              {getBRLFormattedValue(grahamPrice)}
            </strong>
          </div>
          <ArrowRightIcon className={`h-8 w-8 ${content.className}`} />
          <div className="flex flex-col gap-1">
            <span className="text-sm">Preço atual</span>
            <strong className="text-xl">{getBRLFormattedValue(price)}</strong>
          </div>
        </div>

        <p>{content.result}</p>
      </section>

      <section className="flex items-center gap-2 p-4">
        <QuestionMarkCircleIcon className="h-5 w-5 min-w-fit text-neutral-500" />
        <p className="text-sm">
          Preço justo de Graham é um cálculo criado por Benjamin Graham que
          utiliza o LPA e o VPA para determinar o preço justo de uma ação.
        </p>
      </section>
    </div>
  )
}
