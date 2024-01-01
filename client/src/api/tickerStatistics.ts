import {AxiosResponse} from 'axios'

// @ts-ignore
import api from "../libs/api"
import { TickerStatistics } from '../types/tickerStatistics'

export async function getTickerStats(ticker_symbol: string): Promise<AxiosResponse<TickerStatistics[]>> {
  return api({method: "get", url: `/stats/${ticker_symbol}`})
}