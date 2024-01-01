import express from "express"

import { addErrorHandlingToController } from "../utils/error.js"
import { MfRequest } from "../types/express.js"
import { SubmitTradeReqPayload, validateSubmitTradeDetails } from "./req-data-validation/tradeValidation.js"
import { Trade } from "../model/index.js"
import tradeService from "../services/tradeService.js"


async function submitTrade(
  req: MfRequest<SubmitTradeReqPayload>,
  res: express.Response<Trade.Trade | string>
): Promise<void> {
  // validate trade details
  const trade = validateSubmitTradeDetails(req.body)
  const newTrade = await tradeService.submitTrade(trade)
  res.send(newTrade)
}

const exportDefault = {
  submitTrade,
}

export default addErrorHandlingToController(exportDefault)
