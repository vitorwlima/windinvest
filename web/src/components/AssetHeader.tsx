import { FormattedAsset } from 'src/utils/formatAsset'

type Props = {
  about: FormattedAsset['about']
}

export const AssetHeader: React.FC<Props> = ({ about }) => {
  const { ticker, name } = about
  return (
    <header className="bg-neutral-800 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 font-bold">
        <h1 className="text-3xl">{ticker}</h1>
        <h2 className="text-xs">{name}</h2>
      </div>
    </header>
  )
}
