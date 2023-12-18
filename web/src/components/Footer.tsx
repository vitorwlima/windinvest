import { Logo } from './Logo'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 w-full border-t border-gray-700 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <Logo size="md" />
        <address className="flex flex-col text-sm not-italic sm:text-base">
          <p className="font-bold">Contato</p>
          <a href="mailto:vitorwlima13@gmail.com">vitorwlima13@gmail.com</a>
        </address>
      </div>
    </footer>
  )
}
