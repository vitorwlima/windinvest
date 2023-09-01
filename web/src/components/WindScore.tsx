import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import { Asset } from 'src/queries/useGetAsset'
import { formatToRatio } from 'src/utils/formatToRatio'

type Props = {
  windScore: Asset['windScore']
}

export const WindScore: React.FC<Props> = ({ windScore }) => {
  const scoreData = [
    { title: 'Valuation', score: windScore.valuation },
    { title: 'Eficiência', score: windScore.efficiency },
    { title: 'Lucratividade', score: windScore.profitability },
    { title: 'Saúde Financeira', score: windScore.debt },
  ]

  const checkList = [
    {
      title: 'Empresa com liquidez diária acima de R$ 2M',
      check: windScore.holderChecklist.liquidity,
    },
    {
      title: 'Empresa com ROE acima de 10%',
      check: windScore.holderChecklist.roe,
    },
    {
      title: 'Empresa com dívida menor que patrimônio',
      check: windScore.holderChecklist.debt,
    },
    {
      title: 'Empresa com lucro no último ano',
      check: windScore.holderChecklist.profit,
    },
  ]

  return (
    <div className="mx-auto mt-12 grid max-w-6xl rounded-2xl rounded-t-none border-t-4 border-green-500 bg-neutral-800 pt-4">
      <header className="border-b border-neutral-500">
        <h3 className="px-4 pb-4 text-2xl font-bold">Ranking Wind</h3>
      </header>

      <section className="border-b border-neutral-500 p-4">
        <h4 className="mb-4 text-lg font-bold">Checklist HOLDER</h4>

        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {checkList.map(({ title, check }) => (
            <div key={title} className="flex items-center gap-2">
              <span>
                {check ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </span>
              <p>{title}</p>
            </div>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-1 place-items-center gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
        {scoreData.map(({ title, score }) => (
          <div key={title} className="flex flex-col items-center">
            <p className="text-lg font-bold text-green-500">{title}</p>
            <strong>{score === null ? 'N/A' : formatToRatio(score)}</strong>
          </div>
        ))}
      </section>
    </div>
  )
}
