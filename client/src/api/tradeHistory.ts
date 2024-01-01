import {AxiosResponse} from 'axios'

// @ts-ignore
import api from "../libs/api"
import { TradeHistory } from '../types/tradeHistory'

export async function getTradeHistoryByTicker(ticker_symbol: string): Promise<AxiosResponse<TradeHistory[]>> {
  return api({method: "get", url: `/trade-history/${ticker_symbol}`})
}