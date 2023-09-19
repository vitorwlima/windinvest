import { UserButton } from '@clerk/nextjs'
import { Logo } from './Logo'
import { SearchAsset } from './SearchAsset'

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-neutral-500 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <Logo size="lg" />
        <section className="flex w-full max-w-md items-center gap-4">
          <SearchAsset />
          <UserButton />
        </section>
      </div>
    </header>
  )
}
