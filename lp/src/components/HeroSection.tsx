export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex-1">
      <img
        src="/hero-bg.png"
        alt="Gráfico subindo"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-r from-gray-950 to-transparent object-cover" />

      <div className="flex h-full max-w-6xl flex-col justify-center gap-6 px-2 py-4 lg:mx-auto">
        <h1 className="max-w-[40rem] text-4xl font-bold md:text-6xl lg:max-w-3xl lg:text-7xl">
          Análise automatizada do mercado acionário brasileiro
        </h1>
        <h2 className="max-w-md text-xl text-neutral-200">
          Descubra as melhores ações da bolsa por meio de uma análise
          fundamentalista imparcial.
        </h2>
        <a
          className="w-fit rounded-lg border border-green-500 bg-green-500 px-6 py-2 font-bold text-gray-50 transition-all hover:brightness-110 focus:outline-none focus:brightness-110"
          href="https://app.windinvest.com.br/registrar"
        >
          Começar agora
        </a>
      </div>
    </section>
  )
}
