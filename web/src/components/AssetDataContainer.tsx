type Props = {
  title: string
  children: React.ReactNode
}

export const AssetDataContainer: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="mx-auto mt-12 grid max-w-6xl pt-4">
      <div className="overflow-hidden rounded-2xl border border-neutral-500">
        <header className="bg-green-500 p-4 text-center">
          <h3 className="text-2xl font-bold">{title}</h3>
        </header>

        {children}
      </div>
    </div>
  )
}
