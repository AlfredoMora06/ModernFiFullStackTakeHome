import * as Trade from '../../model/Trade.js'
import { validateFields } from './index.js'

export interface SubmitTradeReqPayload {
  ticker_symbol: string,
  side: string, 
  price: number, 
  volume: number,
}

export function validateSubmitTradeDetails(reqPayload: any): any {
  const validationFields = Trade.fieldDefinitions.filter((fs) => fs.canBeModifiedByUser)
    .map((fs) => ({...fs, cannotBeNull: fs.requiredForCreateRequest}))
  return validateFields(reqPayload, validationFields)
}