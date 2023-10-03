const assetRanking = [
  {
    ticker: 'TEST3',
    name: 'EMPRESA 1',
    windScore: '30,50',
  },
  {
    ticker: 'ABCD4',
    name: 'EMPRESA 2',
    windScore: '27,12',
  },
  {
    ticker: 'TOPI3',
    name: 'EMPRESA 3',
    windScore: '26,20',
  },
]

export const Ranking: React.FC = () => {
  return (
    <section className="bg-[#00101A]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-2 py-28 text-center">
        <div className="flex max-w-2xl flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ranking de Ações
            </h2>
            <strong className="font-bold text-sky-500">PRO</strong>
          </div>
          <p className="sm:text-lg">
            Obtenha um ranking de <b>TODAS</b> as ações com base na pontuação
            wind para descobrir as melhores oportunidades da bolsa
          </p>
        </div>

        <div className="flex w-full flex-col gap-10">
          <header className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <img
                src="/icons/trophy.svg"
                alt="Ícone de troféu"
                className="w-9 sm:w-11"
              />
              <h3 className="text-xl font-bold sm:text-2xl">
                As Melhores Ações
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-[2fr,2fr,1fr]">
              <div className="rounded-xl border border-gray-400 p-4 text-left">
                <span className="text-sm sm:text-base">Setor</span>
              </div>
              <div className="rounded-xl border border-gray-400 p-4 text-left">
                <span className="text-sm sm:text-base">Subsetor</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl border border-green-500 bg-green-500 p-4 sm:w-fit lg:w-auto">
                <span className="text-sm font-medium sm:text-base">
                  Filtros avançados
                </span>
                <img src="/icons/dropdown.svg" alt="Ícone de setinha" />
              </div>
            </div>
          </header>

          <ul className="space-y-5">
            {assetRanking.map((asset, position) => (
              <li
                key={asset.ticker}
                className="flex items-center justify-between rounded-xl bg-[#000B11] p-5"
              >
                <div className="flex items-center gap-6">
                  <span>{position + 1}</span>
                  <div className="flex flex-col items-start">
                    <b>{asset.ticker}</b>
                    <p className="text-xs">{asset.name}</p>
                  </div>
                </div>

                <b>{asset.windScore}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
