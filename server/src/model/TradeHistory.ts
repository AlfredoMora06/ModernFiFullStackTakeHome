import { FieldSpec } from "./Model"

const tradeStatusType: string[] = ["pending", "successful", "failed"]

export type TradeStatus = 'pending' | 'successful'| 'failed'

export interface TradeHistory {
  trade_history_id: string,
  trade_id: string,
  ticker_symbol: string,
  side: string,
  price: number,
  volume: number,
  timestamp: string,
  trade_status: TradeStatus
};

export const fieldDefinitions: FieldSpec[] = [
  {
    name: 'trade_history_id',
    type: 'UUID',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'trade_id',
    type: 'UUID',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'ticker_symbol',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'side',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'price',
    type: 'number',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'volume',
    type: 'number',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'timestamp',
    type: 'timestamp',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'trade_status',
    type: 'enum',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false,
    enumValues: tradeStatusType,
  },
]