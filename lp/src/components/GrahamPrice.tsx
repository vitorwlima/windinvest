export const GrahamPrice: React.FC = () => {
  return (
    <section className="bg-[#000B11]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-2 py-28 text-center">
        <div className="flex max-w-2xl flex-col gap-1">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Preço de Graham
          </h2>

          <p className="sm:text-lg">
            Cálculo automático do preço justo segundo a fórmula do grande
            economista Benjamin Graham{' '}
            <span className="text-sm sm:text-base">
              (mentor de <strong>Warren Buffet</strong>)
            </span>
            .
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-green-500">
          <header className="bg-green-500 p-4 text-center text-white">
            <h3 className="text-2xl font-bold">PREÇO JUSTO DE GRAHAM</h3>
          </header>

          <div className="flex flex-col gap-4 p-8">
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-start">
                <p className="text-sm">Preço atual</p>
                <p className="text-2xl font-bold">R$ 14,45</p>
              </div>
              <img
                src="/icons/arrow-right.svg"
                alt="Seta verde para a direita"
              />
              <div className="flex flex-col items-start">
                <p className="text-sm">Preço justo</p>
                <p className="text-2xl font-bold">R$ 19,26</p>
              </div>
            </div>
            <p>
              Ação está <b>abaixo</b> do preço justo de Graham
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
