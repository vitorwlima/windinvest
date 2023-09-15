import { FormattedAsset } from 'src/utils/formatAsset'
import { getFundamentals } from 'src/utils/getFundamentals'
import { AssetDataContainer } from './AssetDataContainer'

type Props = {
  asset: FormattedAsset
}

export const Fundamentals: React.FC<Props> = ({ asset }) => {
  const fundamentals = getFundamentals(asset)

  return (
    <AssetDataContainer title="INDICADORES FUNDAMENTALISTAS">
      {fundamentals.map(({ title, data }) => (
        <section className="border-neutral-500 p-4" key={title}>
          <h4 className="mb-4 text-lg">
            Indicadores de <span className="text-green-500">{title}</span>
          </h4>

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.map(({ title, value }) => (
              <li
                key={title}
                className="flex flex-col gap-1 rounded-xl border border-neutral-500 p-4"
              >
                <p className="text-xs sm:text-sm">{title.toUpperCase()}</p>
                <data value={value} className="text-lg font-bold">
                  {value}
                </data>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </AssetDataContainer>
  )
}
