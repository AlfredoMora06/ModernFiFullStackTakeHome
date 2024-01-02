import chai from "chai"
import chaiHttp from "chai-http"
import "mocha"

import app from "../../src/app.js"
import { addFixtures, flushFixtures } from "../fixtures/index.js"
import { db } from "../../src/data/db.js"
import { convertStringToValidNumber } from "../../src/utils/validation.js"


chai.use(chaiHttp)
const expect = chai.expect

describe("tickerController", () => {

  beforeEach(async () => {
    await addFixtures()
  })

  afterEach(async () => {
    await flushFixtures()
  })

  describe('createTicker',  () => {

    describe('validation', () => {
      it('rejects if ticker is not string', async () => {
        const res = await chai.request(app).post(`/v1/ticker`)
          .send({ticker_symbol: 283})
        expect(res.status).to.equal(400)
      })

      it('rejects if ticker has already been created', async () => {
        const res = await chai.request(app).post(`/v1/ticker`)
          .send({ticker_symbol: 'AAPL'})
        expect(res.status).to.equal(401)
        expect(res.text).to.include('Ticker already exists')
      })
    })

    it('successful request returns 200', async () => {
      const res = await chai.request(app).post(`/v1/ticker`)
        .send({ticker_symbol: "DCD"})
      expect(res.status).to.equal(200)
    })

    it('creates ticker statistics with default values', async () => {
      const tickerSymbol = ("DCD").toUpperCase()
      const res = await chai.request(app).post(`/v1/ticker`)
        .send({ticker_symbol: tickerSymbol})
      expect(res.status).to.equal(200)
      const tickerStatisticsAfter = (await db('ticker_statistics').select().where('ticker_symbol', tickerSymbol))[0]
      expect(convertStringToValidNumber(tickerStatisticsAfter.highest_price)).to.equal(0)
      expect(convertStringToValidNumber(tickerStatisticsAfter.lowest_price)).to.equal(0)
      expect(convertStringToValidNumber(tickerStatisticsAfter.vwap)).to.equal(0)
    })
  })
})
