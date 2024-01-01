import {FixtureTable} from "./util/index.js"

const aaplTradeStats = {
  ticker_symbol: "AAPL",
  highest_price: 100,
  lowest_price: 5,
  vwap: 6,
}


const ticketReviewPeriodFixtures: FixtureTable = {
  tableName: 'trade_statistics',
  alwaysFlush: true,
  data: {
    aaplTradeStats,
  }
}

export default ticketReviewPeriodFixtures
