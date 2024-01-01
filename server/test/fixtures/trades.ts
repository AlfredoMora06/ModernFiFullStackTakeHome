import {FixtureTable} from "./util/index.js"

const aaplBuyTrade = {
  ticker_symbol: {from: 'trade_statistics', where: {ticker_symbol: 'AAPL'}},
  side: 'buy',
  price: 10,
  volume: 1,
  timestamp: new Date(),
  status: "succesful"
}


const tradeFixtures: FixtureTable = {
  tableName: 'trades',
  alwaysFlush: true,
  data: {
    aaplBuyTrade,
  }
}

export default tradeFixtures
