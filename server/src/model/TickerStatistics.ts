import { FieldSpecForDiff } from "./Model"

export interface TickerStatistics {
  ticker_symbol: string,
  highest_price: number, 
  lowest_price: number, 
  vwap: number
}

export const fieldDefinitions: FieldSpecForDiff[] = [
  {
    name: 'ticker_symbol',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'highest_price',
    type: 'number',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'lowest_price',
    type: 'number',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true,
  },
  {
    name: 'vwap',
    type: 'number',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true,
  },
]