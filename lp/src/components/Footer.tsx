export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-2 pb-8 pt-20">
        <p className="pb-6 text-center">
          Todas as informações apresentadas tem caráter informativo e são
          provenientes de fontes públicas como B3, CVM, TESOURO NACIONAL, etc. e
          de dados calculados a partir das informações coletadas. O Wind Invest
          não tem o objetivo de fazer sugestão de compra ou venda de ativos,
          sendo assim, não se responsabiliza pelas decisões e caminhos tomados a
          partir da análise das informações aqui apresentadas.
        </p>
        <section className="flex items-center justify-between border-t border-gray-400 pt-6">
          <img src="/logo.svg" alt="Wind Invest Logo" className="w-24" />
          <p className="hidden md:block">
            © 2023 <strong>Wind Invest</strong>.
          </p>
          <address className="flex flex-col not-italic">
            <p className="font-bold">Contato</p>
            <a href="mailto:contato@windinvest.com.br">
              contato@windinvest.com.br
            </a>
          </address>
        </section>

        <p className="block w-full items-center justify-center pt-10 text-center md:hidden">
          © 2023 <strong>Wind Invest</strong>.
        </p>
      </div>
    </footer>
  )
}
