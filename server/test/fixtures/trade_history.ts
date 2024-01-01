import {FixtureTable} from "./util/index.js"

const aaplBuyTrade = {
  ticker_symbol: {from: 'trade_statistics', where: {ticker_symbol: 'AAPL'}},
  side: 'buy',
  price: 10,
  volume: 1,
  timestamp: new Date(),
  status: "succesful"
}


const tradeHistoryFixtures: FixtureTable = {
  tableName: 'trade_history',
  alwaysFlush: true,
  data: {
    aaplBuyTrade,
  }
}

export default tradeHistoryFixtures
