import Link from 'next/link'
import { BestAssets } from 'src/queries/useGetBestAssets'
import { formatToRatio } from 'src/utils/formatToRatio'

type Props = {
  bestAssets: BestAssets
  count: number
  page: number
  onPageChange: (page: number) => void
}

export const BestAssetsList: React.FC<Props> = ({
  bestAssets,
  count,
  page,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / 10)
  const firstPosition = (page - 1) * 10 + 1

  const allPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1)
  const displayedPagesArray = allPagesArray.filter(
    (currPage) =>
      currPage === 1 ||
      currPage === totalPages ||
      (currPage >= page - 2 && currPage <= page + 2),
  )

  return (
    <div>
      <ol className="flex flex-col gap-2">
        {bestAssets.map((asset, i) => (
          <li key={asset.ticker}>
            <Link
              href={`/ativos/${asset.ticker}`}
              className="flex items-center justify-between rounded-md bg-neutral-800 p-4"
            >
              <section className="flex items-center gap-8">
                <span className="w-6 text-lg font-bold text-green-500">
                  {firstPosition + i}
                </span>
                <div className="flex flex-col">
                  <strong>{asset.ticker}</strong>
                  <p className="text-xs">{asset.fantasyName}</p>
                </div>
              </section>
              <section>
                <data
                  value={asset.windScore.windFinalScore}
                  className="font-bold text-green-500"
                >
                  {formatToRatio(asset.windScore.windFinalScore)}
                </data>
              </section>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-center justify-center gap-2">
        {displayedPagesArray.map((currPage) => (
          <button
            key={currPage}
            className={`${
              currPage === page
                ? 'bg-green-500 text-white'
                : 'bg-neutral-800 text-green-500'
            } rounded-md px-4 py-2 font-bold`}
            onClick={() => onPageChange(currPage)}
          >
            {currPage}
          </button>
        ))}
      </div>
    </div>
  )
}
