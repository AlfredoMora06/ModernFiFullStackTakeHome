import { SubmitTradeReqPayload } from "../controllers/req-data-validation/tradeValidation.js"
import { db } from "../data/db.js"
import tradeData from "../data/tradeData.js"
import { Trade } from "../model/index.js"
import statService from "./statService.js"
import tradeHistoryService from "./tradeHistoryService.js"


async function submitTrade(trade: SubmitTradeReqPayload): Promise<Trade.Trade> {
  const submittedTrade = await tradeData.submitTrade(
    {
      ...trade, 
      timestamp: new Date(),
      status: "successful"
    }
  )

  // After a trade is submitted add it to history
  await tradeHistoryService.createHistoryForTrade(submittedTrade)
  // Upon a successful trade submission adjust the relevant metrics in the ticker_statistics table for the corresponding ticker symbol.
  if(submittedTrade.status === "successful"){
    const currentTickerStats = (await db('ticker_statistics')
      .select('ticker_statistics.*')
      .where('ticker_statistics.ticker_symbol', trade.ticker_symbol))[0]
    if(currentTickerStats != null){
      await statService.updateTickerStats(submittedTrade, currentTickerStats)
    } else {
      await statService.createTickerStats(submittedTrade)
    }
  }

  return submittedTrade
}

export default {
  submitTrade,
}