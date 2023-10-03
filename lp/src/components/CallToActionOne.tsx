export const CallToActionOne: React.FC = () => {
  return (
    <section className="bg-[#00101A]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-2 py-28 text-center">
        <img src="/cta-graph.png" alt="Gráfico de ações ilustrativo" />
        <div className="flex max-w-xl flex-col items-center gap-4">
          <h4 className="text-4xl font-extrabold sm:text-5xl">
            Crie sua conta grátis
          </h4>
          <p className="sm:text-xl">
            Experimente o plano <strong>PRO</strong> quando quiser, com 7 dias
            grátis e cancelamento mensal sem taxa.
          </p>
        </div>
        <a
          className="w-fit rounded-lg border border-gray-50 bg-gray-50 px-6 py-2 font-medium text-[#00101A] transition-all hover:brightness-110 focus:outline-none focus:brightness-110"
          href="https://app.windinvest.com.br/registrar"
        >
          Começar agora
        </a>
      </div>
    </section>
  )
}
