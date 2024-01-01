export type TradeStatus = 'pending' | 'successful'| 'failed'

export type TradeHistory = {
  trade_history_id: string,
  trade_id: string,
  ticker_symbol: string,
  side: string,
  price: number,
  volume: number,
  timestamp: string,
  trade_status: TradeStatus
};