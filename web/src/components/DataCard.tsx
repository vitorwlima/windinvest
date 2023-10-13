import clsx from 'clsx'

type Props = {
  title: string
  data: string
  isLast: boolean
}

export const DataCard: React.FC<Props> = ({ title, data, isLast }) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center overflow-hidden rounded-xl font-semibold',
        {
          'sm:col-span-2 lg:col-span-1': isLast,
        },
      )}
    >
      <h3 className="w-full bg-green-500 p-2 text-center text-sm tracking-wide text-gray-100">
        {title.toUpperCase()}
      </h3>
      <p className="w-full bg-gray-900 p-5 text-center text-lg md:text-xl lg:text-2xl">
        {data}
      </p>
    </div>
  )
}
