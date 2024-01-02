import {FixtureTable} from "./util/index.js"

const aaplBuyTrade = {
  trade_id: {from: 'trades', where: {price: 10}},
  ticker_symbol: 'AAPL',
  side: 'buy',
  price: 10,
  volume: 1,
  timestamp: new Date(),
  trade_status: "successful"
}


const tradeHistoryFixtures: FixtureTable = {
  tableName: 'trade_history',
  alwaysFlush: true,
  data: {
    aaplBuyTrade,
  }
}

export default tradeHistoryFixtures
