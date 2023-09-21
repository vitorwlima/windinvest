import { UserButton } from '@clerk/nextjs'
import { Logo } from './Logo'
import { SearchAsset } from './SearchAsset'

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-neutral-500 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Logo size="lg" showPro />
        <section className="flex w-full max-w-md flex-1 items-center justify-end gap-4">
          <SearchAsset />
          <UserButton
            userProfileMode="navigation"
            userProfileUrl="/configuracoes/conta"
            appearance={{
              elements: {
                userButtonTrigger:
                  'focus:shadow-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-900',
              },
            }}
          />
        </section>
      </div>
    </header>
  )
}
