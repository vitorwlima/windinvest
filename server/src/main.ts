import yahooFinance from "yahoo-finance2";

const test = async () => {
  const result = await yahooFinance.quoteSummary("PETR4.SA", { modules: ["financialData"] })
  console.dir(result, { depth: null })
};

test()
