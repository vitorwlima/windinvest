export const Header: React.FC = () => {
  return (
    <header>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-2 py-4">
        <img src="/logo.svg" alt="Wind Invest Logo" className="w-32" />

        <nav className="flex items-center gap-3">
          <a
            className="rounded-lg border border-green-500 bg-transparent px-6 py-2 text-sm font-medium text-green-500 transition-colors hover:bg-green-500 hover:text-gray-50 focus:bg-green-500 focus:text-gray-50 focus:outline-none sm:text-base"
            href="https://app.windinvest.com.br/registrar"
          >
            Registrar
          </a>
          <a
            className="rounded-lg border border-green-500 bg-green-500 px-6 py-2 text-sm font-medium text-gray-50 transition-all hover:brightness-110 focus:outline-none focus:brightness-110 sm:text-base"
            href="https://app.windinvest.com.br/entrar"
          >
            Entrar
          </a>
        </nav>
      </div>
    </header>
  )
}
