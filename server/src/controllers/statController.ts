import express from "express"

import { addErrorHandlingToController } from "../utils/error.js"
import { MfRequest } from "../types/express.js"
import { validateString } from "./req-data-validation/index.js"
import statService from "../services/statService.js"


async function getTickerStats(
  req: MfRequest<{ticker_symbol: string}>,
  res: express.Response
): Promise<void> {
  const ticker_symbol = validateString(req.params.ticker_symbol).toLocaleUpperCase()
  const tickerStats = await statService.getTickerStats(ticker_symbol)
  res.send(tickerStats)
}


const exportDefault = {
  getTickerStats,
}

export default addErrorHandlingToController(exportDefault)
