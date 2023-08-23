type Props = {
  title: string
  data: string
}

export const DataCard: React.FC<Props> = ({ title, data }) => {
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-xl font-bold">
      <h3 className="w-full bg-green-500 p-2 text-center text-sm tracking-wide text-neutral-800">
        {title.toUpperCase()}
      </h3>
      <p className="w-full bg-neutral-800 p-4 text-center text-xl">{data}</p>
    </div>
  )
}
