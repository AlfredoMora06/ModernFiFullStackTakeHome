import { db } from "../data/db.js"
import statData from "../data/statData.js"
import { TickerStatistics, Trade } from "../model/index.js"
import { columnsReturnedFromDbQuery } from "../model/Model.js"
import { convertStringToValidNumber } from "../utils/validation.js"


async function updateTickerStats(trade: Trade.Trade, currentTickerStats: TickerStatistics.TickerStatistics): Promise<void> {
  const tradeHistory = await db('trade_history').where('trade_history.ticker_symbol', trade.ticker_symbol)
  let totalVolumeForAllTrades = 0
  let sumOfVolumeXPriceForAllTrades = 0

  if(tradeHistory.length > 0){
    totalVolumeForAllTrades = tradeHistory.reduce<number>(
      (sum, t) => {
        return sum + t.volume
      }, 0
    )
    sumOfVolumeXPriceForAllTrades = tradeHistory.reduce<number>(
      (sum, t) => {
        return (sum + (t.volume * (convertStringToValidNumber(t.price) ?? 0)))
      }, 0
    )
  }

  // Calculate lowest and highest price
  let lowest_price = Number.POSITIVE_INFINITY
  let highest_price = Number.NEGATIVE_INFINITY
  tradeHistory.forEach((h) => {
    if ((convertStringToValidNumber(h.price) ?? 0) < (convertStringToValidNumber(lowest_price) ?? 0)) 
      lowest_price = h.price
    if ((convertStringToValidNumber(h.price) ?? 0) > (convertStringToValidNumber(highest_price) ?? 0)) 
      highest_price = h.price;
  })

  const newTickerStats: TickerStatistics.TickerStatistics = {
    ticker_symbol: trade.ticker_symbol,
    highest_price,
    lowest_price,
    vwap: totalVolumeForAllTrades > 0 && sumOfVolumeXPriceForAllTrades > 0 
      ? sumOfVolumeXPriceForAllTrades/totalVolumeForAllTrades 
      : 0
  }

  await statData.updateTickerStats(newTickerStats)
}

async function createTickerStats(trade: Trade.Trade): Promise<void> {
  const newTickerStats: TickerStatistics.TickerStatistics = {
    ticker_symbol: trade.ticker_symbol,
    highest_price: trade.price,
    lowest_price: trade.price,
    vwap: (trade.volume * trade.price) / trade.volume // Sum of (Volume * Price) / Total Volume
  }

  await statData.createTickerStats(newTickerStats)
}

async function getTickerStats(ticker_symbol: string): Promise<any[]> {
  return statData.getTickerStats(
    columnsReturnedFromDbQuery(TickerStatistics.fieldDefinitions, 'ticker_statistics'),
    ticker_symbol
  )
}



export default {
  updateTickerStats,
  createTickerStats,
  getTickerStats,
}