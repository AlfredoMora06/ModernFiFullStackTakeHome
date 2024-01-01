import statData from "../data/statData.js"

async function createTicker(ticker_symbol: string): Promise<void> {
  const tickerStats = {
    ticker_symbol,
    highest_price: 0,
    lowest_price: 0,
    vwap: 0,
  } 

  return statData.createTickerStats(tickerStats)
}

export default {
  createTicker,
}