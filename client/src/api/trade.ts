import {AxiosResponse} from 'axios'

// @ts-ignore
import api from "../libs/api"
import { TradeSide } from '../types/trade'

export interface SubmitTrade {
  ticker_symbol: string,
  side: TradeSide, 
  price: number, 
  volume: number,
}

export interface Trade {
  trade_id: string,
  ticker_symbol: string,
  side: string, 
  price: number, 
  volume: number,
  status: "fulfilled",
}

export async function submitTrade(trade: SubmitTrade): Promise<AxiosResponse<Trade>> {
  return api({
    method: "post", 
    url: `/submit_trade`,
    data: trade,
  })
}