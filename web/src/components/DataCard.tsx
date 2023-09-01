type Props = {
  title: string
  data: string
  isLast: boolean
}

export const DataCard: React.FC<Props> = ({ title, data, isLast }) => {
  return (
    <div
      className={`flex flex-col items-center overflow-hidden rounded-xl font-bold ${
        isLast ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <h3 className="w-full bg-green-500 p-2 text-center text-sm tracking-wide text-neutral-800">
        {title.toUpperCase()}
      </h3>
      <p className="w-full bg-neutral-800 p-5 text-center text-2xl">{data}</p>
    </div>
  )
}
