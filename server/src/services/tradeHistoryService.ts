import tradeHistoryData from "../data/tradeHistoryData.js"
import { Trade, TradeHistory } from "../model/index.js"
import { columnsReturnedFromDbQuery } from "../model/Model.js"

async function createHistoryForTrade(trade: Trade.Trade): Promise<void> {
    const tradeHistory = {
      ticker_symbol: trade.ticker_symbol,
      trade_id: trade.trade_id,
      side: trade.side,
      price: trade.price,
      volume: trade.volume,
      timestamp: new Date(),
      trade_status: trade.status
    } 
  
    return tradeHistoryData.createTradeHistory(tradeHistory)
}


async function getTradeHistoryByTicker(ticker_symbol: string): Promise<TradeHistory.TradeHistory[]> {
  return tradeHistoryData.getTradeHistoryByTicker(
    columnsReturnedFromDbQuery(TradeHistory.fieldDefinitions, 'trade_history'),
    ticker_symbol
  )
}

export default {
  createHistoryForTrade,
  getTradeHistoryByTicker,
}