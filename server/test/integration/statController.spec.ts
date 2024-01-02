import chai from "chai"
import chaiHttp from "chai-http"
import "mocha"

import app from "../../src/app.js"
import { addFixtures } from "../fixtures/index.js"


chai.use(chaiHttp)
const expect = chai.expect

describe("statController", () => {
  describe('getTickerStats',  () => {

    beforeEach(async () => {
      await addFixtures()
    })

    it('successful request returns 200 and returns correct ticker statistics info', async () => {
      const tickerSymbol = ("aapl").toUpperCase()
      const res = await chai.request(app).get(`/v1/stats/${tickerSymbol}`)
      expect(res.status).to.equal(200)
      expect(res.body.find((s: any) => s.ticker_symbol != tickerSymbol) == null).to.be.true

    })
  })

})
