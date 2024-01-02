import { db } from "../../data/db.js"
import { HttpError } from "../../utils/error.js"

export async function tickerExists(ticker_symbol: string): Promise<void> {
  const tickerStats = (await db('ticker_statistics').where('ticker_symbol', ticker_symbol))[0]

  if(!!tickerStats){
    throw new HttpError(401, 'Ticker already exists.')
  }
}