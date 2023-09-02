import { FormattedAsset } from 'src/utils/formatAsset'
import { getFundamentals } from 'src/utils/getFundamentals'

type Props = {
  asset: FormattedAsset
}

export const Fundamentals: React.FC<Props> = ({ asset }) => {
  const fundamentals = getFundamentals(asset)

  return (
    <div className="mx-auto mt-12 grid max-w-6xl rounded-2xl rounded-t-none border-t-4 border-green-500 bg-neutral-800 pt-4">
      <header className="border-b border-neutral-500">
        <h3 className="px-4 pb-4 text-2xl font-bold">
          Indicadores Fundamentalistas
        </h3>
      </header>

      {fundamentals.map(({ title, data }) => (
        <section className="border-neutral-500 p-4" key={title}>
          <h4 className="mb-4 text-lg font-bold">
            Indicadores de <span className="text-green-500">{title}</span>
          </h4>

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.map(({ title, value }) => (
              <li
                key={title}
                className="flex flex-col gap-1 rounded-xl border border-neutral-500 p-4"
              >
                <p className="text-xs sm:text-sm">{title.toUpperCase()}</p>
                <strong className="text-lg">{value}</strong>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
