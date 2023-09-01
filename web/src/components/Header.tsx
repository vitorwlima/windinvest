import { ChartBarSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { SearchAsset } from './SearchAsset'

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-neutral-500 px-2 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <Link className="flex items-center gap-2" href="/">
          <ChartBarSquareIcon className="h-8 w-8 text-green-500" />
          <h1 className="text-4xl font-bold tracking-wider">Stockz</h1>
        </Link>
        <section className="flex w-full max-w-md items-center gap-8">
          <SearchAsset />
          <UserCircleIcon className="h-12 w-12" />
        </section>
      </div>
    </header>
  )
}
