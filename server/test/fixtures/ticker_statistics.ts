import {FixtureTable} from "./util/index.js"

const aaplStats = {
  ticker_symbol: 'AAPL',
  highest_price: 100,
  lowest_price: 5,
  vwap: 6,
}


const tickerStatisticsFixtures: FixtureTable = {
  tableName: 'ticker_statistics',
  alwaysFlush: true,
  data: {
    aaplStats,
  }
}

export default tickerStatisticsFixtures
