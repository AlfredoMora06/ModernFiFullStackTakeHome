import chai from "chai"
import chaiHttp from "chai-http"
import "mocha"

import app from "../../src/app.js"
import { addFixtures } from "../fixtures/index.js"


chai.use(chaiHttp)
const expect = chai.expect

describe("tradeHistoryController", () => {
  describe('getTradeHistoryByTicker',  () => {

    beforeEach(async () => {
      await addFixtures()
    })

    it('successful request returns 200 and returns correct trade history info', async () => {
      const tickerSymbol = ("aapl").toUpperCase()
      const res = await chai.request(app).get(`/v1/trade_history/${tickerSymbol}`)
      expect(res.status).to.equal(200)
      expect(res.body.find((h: any) => h.ticker_symbol != tickerSymbol) == null).to.be.true

    })
  })

})
