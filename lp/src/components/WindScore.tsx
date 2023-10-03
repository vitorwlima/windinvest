const windPoints = [
  {
    title: 'Valuation',
    description:
      'Determina o potencial de valorização do ativo baseado no quão descontado ele está.',
    key: 'valuation',
  },
  {
    title: 'Eficiência',
    description: 'Determina a qualidade dos seus processos financeiros.',
    key: 'efficiency',
  },
  {
    title: 'Lucratividade',
    description: 'Determina a capacidade de geração de riqueza da empresa.',
    key: 'profit',
  },
  {
    title: 'Saúde financeira',
    description:
      'Determina a segurança financeira de empresa com relação ao seu balanço e suas dívidas.',
    key: 'debt',
  },
]

export const WindScore: React.FC = () => {
  return (
    <section className="bg-[#000B11]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-2 py-28 text-center">
        <div className="flex max-w-2xl flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Pontuação Wind
            </h2>
            <strong className="font-bold text-sky-500">PRO</strong>
          </div>
          <p className="sm:text-lg">
            Algoritmo fundamentalista que calcula com base nos principais
            indicadores da ação para gerar uma pontuação comparável.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {windPoints.map(({ title, description, key }) => (
            <li
              key={key}
              className="flex flex-col items-center justify-center gap-3 rounded-xl border border-green-500 p-6"
            >
              <img src={`/windscore/${key}.svg`} alt={`Logo de ${title}`} />
              <h3 className="text-xl font-bold text-green-500">{title}</h3>
              <p className="text-lg text-neutral-400">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
