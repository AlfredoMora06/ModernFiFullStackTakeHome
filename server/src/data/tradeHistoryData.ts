import { db } from "./db.js"

async function createTradeHistory(tradeHistory: any): Promise<any> {
  return (await db('trade_history').insert(tradeHistory, '*'))[0]
}

async function getTradeHistoryByTicker(
  fields: string[],
  ticker_symbol: string
): Promise<any[]> {
  return db('trade_history')
    .select(fields.map((f) => f))
    .where('trade_history.ticker_symbol', ticker_symbol)
    .orderBy('trade_history.timestamp', 'DESC')
}

export default {
  createTradeHistory,
  getTradeHistoryByTicker,
}