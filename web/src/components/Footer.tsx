import { ChartBarSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 w-full border-t border-neutral-500 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <Link className="flex items-center gap-1" href="/">
          <ChartBarSquareIcon className="h-5 w-6 text-green-500" />
          <h1 className="text-2xl font-bold tracking-wider">Stockz</h1>
        </Link>
      </div>
    </footer>
  )
}
