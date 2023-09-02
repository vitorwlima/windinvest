import { ChartBarSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { SearchAsset } from './SearchAsset'

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-neutral-500 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <Link className="flex items-center gap-2" href="/">
          <ChartBarSquareIcon className="h-6 w-6 text-green-500 sm:h-8 sm:w-8" />
          <h1 className="text-3xl font-bold tracking-wider sm:text-4xl">
            Stockz
          </h1>
        </Link>
        <section className="flex w-full max-w-md items-center gap-8">
          <SearchAsset />
        </section>
      </div>
    </header>
  )
}
