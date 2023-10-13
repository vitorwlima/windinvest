import { Logo } from './Logo'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 w-full border-t border-gray-700 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <Logo size="md" />
      </div>
    </footer>
  )
}
