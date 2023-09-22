import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline'
import { useUpgradeToProModal } from 'src/hooks/useUpgradeToProModal'
import { Asset } from 'src/queries/useGetAsset'
import { formatToRatio } from 'src/utils/formatToRatio'
import { AssetDataContainer } from './AssetDataContainer'

type Props = {
  windScore: Asset['windScore']
}

const windScoreDescription = {
  text: 'Pontuação baseada no algoritmo da Wind Invest. Combina dados de todos os indicadores fundamentalistas para retornar um número comparável para o ativo. Sua melhor utilização é comparando ações do mesmo setor (seção Melhores Ações na página inicial).',
  moreInfoURL: 'https://windinvest.com.br/ranking-wind',
}

export const WindScore: React.FC<Props> = ({ windScore }) => {
  const { openModal } = useUpgradeToProModal()

  if (windScore === 'Forbidden') {
    const scoreData = [
      { title: 'Valuation', score: 0 },
      { title: 'Eficiência', score: 0 },
      { title: 'Lucratividade', score: 0 },
      { title: 'Saúde Financeira', score: 0 },
    ]

    const checkList = [
      {
        title: 'Empresa com liquidez diária acima de R$ 1M',
        check: true,
      },
      {
        title: 'Empresa com ROE acima de 10%',
        check: true,
      },
      {
        title: 'Empresa com dívida menor que patrimônio',
        check: true,
      },
      {
        title: 'Empresa com lucro no último ano',
        check: true,
      },
    ]

    return (
      <AssetDataContainer
        title="RANKING WIND"
        description={windScoreDescription}
      >
        <div className="group relative cursor-pointer" onClick={openModal}>
          <button className="absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-lg font-bold transition-colors group-hover:bg-neutral-50 group-hover:text-sky-500">
            Desbloquear
            <LockClosedIcon className="h-4 w-4 group-hover:hidden [&>path]:stroke-[3]" />
            <LockOpenIcon className="hidden h-4 w-4 text-sky-500 group-hover:block [&>path]:stroke-[3]" />
          </button>
          <div className="select-none blur-md">
            <section className="border-b border-neutral-500 p-4">
              <h4 className="mb-4 text-xl font-bold">Checklist HOLDER</h4>

              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {checkList.map(({ title, check }) => (
                  <div key={title} className="flex items-center gap-2">
                    <span>
                      {check ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      ) : (
                        <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                      )}
                    </span>
                    <p>{title}</p>
                  </div>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-1 border-b border-neutral-500 p-4 text-center">
              <p>Pontuação Geral</p>
              <p className="text-xl font-bold text-green-500">
                {formatToRatio(0)}
              </p>
            </section>

            <section className="grid grid-cols-1 place-items-center gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
              {scoreData.map(({ title, score }) => (
                <div key={title} className="flex flex-col items-center">
                  <p className="text-lg font-bold text-green-500">{title}</p>
                  <data value={score === null ? 'N/A' : formatToRatio(score)}>
                    {score === null ? 'N/A' : formatToRatio(score)}
                  </data>
                </div>
              ))}
            </section>
          </div>
        </div>
      </AssetDataContainer>
    )
  }

  const scoreData = [
    { title: 'Valuation', score: windScore.valuation },
    { title: 'Eficiência', score: windScore.efficiency },
    { title: 'Lucratividade', score: windScore.profitability },
    { title: 'Saúde Financeira', score: windScore.debt },
  ]

  const checkList = [
    {
      title: 'Empresa com liquidez diária acima de R$ 1M',
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
    <AssetDataContainer title="RANKING WIND" description={windScoreDescription}>
      <section className="border-b border-neutral-500 p-4">
        <h4 className="mb-4 text-xl font-bold">Checklist HOLDER</h4>

        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {checkList.map(({ title, check }) => (
            <div key={title} className="flex items-center gap-2">
              <span>
                {check ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                ) : (
                  <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                )}
              </span>
              <p>{title}</p>
            </div>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-1 border-b border-neutral-500 p-4 text-center">
        <p>Pontuação Geral</p>
        <p className="text-xl font-bold text-green-500">
          {formatToRatio(windScore.windFinalScore)}
        </p>
      </section>

      <section className="grid grid-cols-1 place-items-center gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
        {scoreData.map(({ title, score }) => (
          <div key={title} className="flex flex-col items-center">
            <p className="text-lg font-bold text-green-500">{title}</p>
            <data value={score === null ? 'N/A' : formatToRatio(score)}>
              {score === null ? 'N/A' : formatToRatio(score)}
            </data>
          </div>
        ))}
      </section>
    </AssetDataContainer>
  )
}
