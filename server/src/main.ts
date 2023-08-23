import yahooFinance from "yahoo-finance2";

const test = async () => {
  const quoteResult = await yahooFinance.quote(`BLAU3.SA`);
  const quoteSummaryResult = await yahooFinance.quoteSummary(`BLAU3.SA`, {
    modules: ["financialData"],
  });

  const pvp = quoteResult.priceToBook;
  const pl = quoteResult.trailingPE;

  console.dir({ quoteResult, quoteSummaryResult, pvp, pl }, { depth: null });
};

test();
