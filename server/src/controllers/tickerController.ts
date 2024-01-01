import express from "express"

import { addErrorHandlingToController } from "../utils/error.js"
import { MfRequest } from "../types/express.js"
import { validateString } from "./req-data-validation/index.js"
import tickerService from "../services/tickerService.js"


async function createTicker(
  req: MfRequest<{}, {ticker_symbol: string}>,
  res: express.Response
): Promise<void> {
  const ticker_symbol = validateString(req.body.ticker_symbol).toLocaleUpperCase()
  const tickerStats = await tickerService.createTicker(ticker_symbol)
  res.send({tickerStats})
}

const exportDefault = {
  createTicker,
}

export default addErrorHandlingToController(exportDefault)
