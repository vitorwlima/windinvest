import { ChartBarSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Props = {
  size: 'md' | 'lg'
}

export const Logo: React.FC<Props> = ({ size }) => {
  return (
    <Link
      className={`flex items-center gap-2 ${size === 'md' ? 'scale-75' : ''}`}
      href="/"
    >
      <ChartBarSquareIcon className="h-6 w-6 text-green-500 sm:h-8 sm:w-8" />
      <h1 className="flex flex-col items-center">
        <p className="text-2xl font-bold leading-4 sm:text-3xl sm:leading-6">
          WIND
        </p>
        <p className="text-xl tracking-widest sm:text-2xl">invest</p>
      </h1>
    </Link>
  )
}
