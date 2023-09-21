type Props = {
  title: string
  children: React.ReactNode
}

export const AssetDataContainer: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="mx-auto mt-12 grid max-w-6xl px-4 pt-4">
      <div className="rounded-2xl border border-neutral-500">
        <header className="rounded-t-2xl bg-green-500 p-4 text-center">
          <h3 className="text-xl font-bold text-neutral-800 sm:text-2xl">
            {title}
          </h3>
        </header>

        {children}
      </div>
    </div>
  )
}
