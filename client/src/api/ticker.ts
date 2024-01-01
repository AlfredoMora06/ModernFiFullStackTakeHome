import {AxiosResponse} from 'axios'

// @ts-ignore
import api from "../libs/api"
import { TickerStatistics } from '../types/tickerStatistics'

export async function createTicker(ticker_symbol: string): Promise<AxiosResponse<{tickerStats: TickerStatistics}>> {
  return api({method: "post", url: `/ticker`, data: {ticker_symbol}})
}