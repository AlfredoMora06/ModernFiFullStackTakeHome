import { SubmitTradeReqPayload } from "../controllers/req-data-validation/tradeValidation.js"
import { Trade } from "../model/index.js"
import { db } from "./db.js"

type SubmitTradeReq = SubmitTradeReqPayload & {timestamp: Date, status: Trade.Status}

async function submitTrade(trade: SubmitTradeReq): Promise<Trade.Trade> {
  const createdArr = await db('trades').insert(trade, '*')
  return createdArr[0]
}

export default {
  submitTrade,
}