import { TickerStatistics } from "../model/TickerStatistics.js"
import { db } from "./db.js"

async function updateTickerStats(tickerStats: TickerStatistics): Promise<any> {
  // @ts-ignore not sure why this is throwing a TS error
  return (await db('ticker_statistics').update(tickerStats).where('ticker_symbol', tickerStats.ticker_symbol))[0]
}

async function createTickerStats(tickerStats: TickerStatistics): Promise<any> {
  return (await db('ticker_statistics').insert(tickerStats, '*'))[0]
}

async function getTickerStats(fields: string[], ticker_symbol: string): Promise<any[]> {
  return db('ticker_statistics')
    .select(fields.map((f) => f))
    .where('ticker_statistics.ticker_symbol', ticker_symbol)
}

export default {
  updateTickerStats,
  createTickerStats,
  getTickerStats,
}
