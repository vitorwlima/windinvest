import clsx from 'clsx'
import Link from 'next/link'
import { BestAssets } from 'src/queries/useGetBestAssets'
import { formatToRatio } from 'src/utils/formatToRatio'

type Props = {
  bestAssets: BestAssets
  count: number
  page: number
  onPageChange: (page: number) => void
  hideContent?: boolean
  loading?: boolean
}

export const BestAssetsList: React.FC<Props> = ({
  bestAssets,
  count,
  page,
  onPageChange,
  hideContent = false,
  loading = false,
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

  const AssetsList = () => {
    if (loading) {
      return (
        <ol className="flex flex-col gap-2">
          {bestAssets.map((asset, i) => (
            <li key={i}>
              <div
                className={clsx(
                  'flex animate-pulse items-center justify-between rounded-md bg-neutral-800 p-4 transition-colors',
                  {
                    group: !hideContent,
                  },
                )}
              >
                <section className="flex items-center gap-8">
                  <span
                    className={clsx('w-6 text-lg font-bold text-green-500', {
                      'group-hover:text-neutral-50': !hideContent,
                    })}
                  >
                    &#12644;
                  </span>
                  <div className="flex flex-col">
                    <strong>&#12644;</strong>
                    <p className="text-xs">&#12644;</p>
                  </div>
                </section>
                <section>
                  <data
                    value="Loading"
                    className={clsx('font-bold text-green-500', {
                      'group-hover:text-neutral-50': !hideContent,
                    })}
                  >
                    &#12644;
                  </data>
                </section>
              </div>
            </li>
          ))}
        </ol>
      )
    }

    return (
      <ol className="flex flex-col gap-2">
        {bestAssets.map((asset, i) => (
          <li key={asset.ticker}>
            <Link
              href={`/ativos/${asset.ticker}`}
              className={clsx(
                'flex items-center justify-between rounded-md bg-neutral-800 p-4 transition-colors hover:bg-green-500 focus:bg-green-500 focus:outline-none',
                {
                  group: !hideContent,
                },
              )}
            >
              <section className="flex items-center gap-8">
                <span
                  className={clsx('w-6 text-lg font-bold text-green-500', {
                    'group-hover:text-neutral-50 group-focus:text-neutral-50':
                      !hideContent,
                  })}
                >
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
                  className={clsx('font-bold text-green-500', {
                    'group-hover:text-neutral-50 group-focus:text-neutral-50':
                      !hideContent,
                  })}
                >
                  {formatToRatio(asset.windScore.windFinalScore)}
                </data>
              </section>
            </Link>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <div>
      <AssetsList />

      <div className="mt-8 flex items-center justify-center gap-2">
        {displayedPagesArray.map((currPage) => (
          <button
            key={currPage}
            className={clsx(
              'rounded-md px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-900',
              {
                'bg-green-500 text-white': currPage === page,
                'bg-neutral-800 text-green-500': currPage !== page,
              },
            )}
            onClick={() => onPageChange(currPage)}
          >
            {currPage}
          </button>
        ))}
      </div>
    </div>
  )
}
