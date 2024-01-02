import { FieldSpecForDiff } from "./Model"

const statusType: string[] = ["pending", "successful", "failed"]

export type Status = 'pending' | 'successful'| 'failed'

export interface Trade {
  id: string,
  ticker_symbol: string,
  side: string, 
  price: number, 
  volume: number,
  timestamp: string,
  status: Status,
}

export const fieldDefinitions: FieldSpecForDiff[] = [
  {
    name: 'id',
    type: 'UUID',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'ticker_symbol',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'side',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true,
  },
  {
    name: 'price',
    type: 'number',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true,
  },
  {
    name: 'volume',
    type: 'number',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true,
  },
  {
    name: 'timestamp',
    type: 'timestamp',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false,
  },
  {
    name: 'status',
    type: 'enum',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: false,
    enumValues: statusType,
  },
]