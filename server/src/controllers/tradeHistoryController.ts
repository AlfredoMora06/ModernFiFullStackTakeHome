import express from "express"

import { addErrorHandlingToController } from "../utils/error.js"
import { MfRequest } from "../types/express.js"
import { TradeHistory } from "../model/index.js"
import tradeHistoryService from "../services/tradeHistoryService.js"
import { validateString } from "./req-data-validation/index.js"


async function getTradeHistoryByTicker(
  req: MfRequest<{ticker_symbol: string}>,
  res: express.Response<TradeHistory.TradeHistory[] | string>
): Promise<void> {
  const ticker_symbol = validateString(req.params.ticker_symbol).toLocaleUpperCase()
  const tradeHistory = await tradeHistoryService.getTradeHistoryByTicker(ticker_symbol)
  res.send(tradeHistory)
}



const exportDefault = {
  getTradeHistoryByTicker,
}

export default addErrorHandlingToController(exportDefault)
