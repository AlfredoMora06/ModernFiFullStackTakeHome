import chai from "chai"
import chaiHttp from "chai-http"
import "mocha"

import app from "../../src/app.js"
import { db } from "../../src/data/db.js"
import { addFixtures, flushFixtures, getFixture } from "../fixtures/index.js"
import { convertStringToValidNumber } from "../../src/utils/validation.js"


chai.use(chaiHttp)
const expect = chai.expect

describe("tradeController", () => {

  beforeEach(async () => {
    await addFixtures()
  })

  afterEach(async () => {
    await flushFixtures()
  })

  describe('submitTrade',  () => {
    describe('validation', () => {
      it('rejects if body is not complete', async () => {
        const res = await chai.request(app).post(`/v1/submit_trade`)
          .send({})
        expect(res.status).to.equal(400)
      })
    })

    it('successful request returns 200', async () => {
      const res = await chai.request(app).post(`/v1/submit_trade`)
        .send({
          ticker_symbol: "XAX",
          price: 50,
          volume: 10,
          side: "buy", 
        })
      expect(res.status).to.equal(200)
    })

    it('creates trade history log', async () => {
      const res = await chai.request(app).post(`/v1/submit_trade`)
        .send({
          ticker_symbol: "XAX",
          price: 50,
          volume: 10,
          side: "buy", 
        })
      expect(res.status).to.equal(200)
      const tradeHistoryAfter = await db('trade_history').select().where('trade_id', res.body.id)
      expect(tradeHistoryAfter.length).to.equal(1)
    })
  
  
    it('updates ticker highest price if applicable', async () => {
      const oldTickerStats = getFixture('ticker_statistics', 'ticker_symbol', 'AAPL')
      const newPrice = 150
      expect(convertStringToValidNumber(oldTickerStats.highest_price) ?? 0).to.be.lessThan(newPrice)
      const res = await chai.request(app).post(`/v1/submit_trade`)
        .send({
          ticker_symbol: oldTickerStats.ticker_symbol,
          price: newPrice,
          volume: 10,
          side: "buy", 
        })
      expect(res.status).to.equal(200)
      expect(convertStringToValidNumber(res.body.price)).to.equal(newPrice)
      const newTickerStats = (await db('ticker_statistics').where('ticker_symbol', res.body.ticker_symbol))[0]
      expect(convertStringToValidNumber(newTickerStats.highest_price)).to.equal(newPrice)
    })

    it('updates ticker lowest price if applicable', async () => {
      const oldTickerStats = getFixture('ticker_statistics', 'ticker_symbol', 'AAPL')
      const newPrice = 1
      expect(convertStringToValidNumber(oldTickerStats.highest_price) ?? 0).to.be.greaterThan(newPrice)
      const res = await chai.request(app).post(`/v1/submit_trade`)
        .send({
          ticker_symbol: oldTickerStats.ticker_symbol,
          price: newPrice,
          volume: 10,
          side: "buy", 
        })
      expect(res.status).to.equal(200)
      expect(convertStringToValidNumber(res.body.price)).to.equal(newPrice)
      const newTickerStats = (await db('ticker_statistics').where('ticker_symbol', res.body.ticker_symbol))[0]
      expect(convertStringToValidNumber(newTickerStats.lowest_price)).to.equal(newPrice)
    })

    it('updates vwap', async () => {
      const oldTickerStats = getFixture('ticker_statistics', 'ticker_symbol', 'AAPL')
      const oldTradeHistory = await db('trade_history').where('ticker_symbol', 'AAPL')
      const newPrice = 50
      const volumeOrdered = 10
      const totalVolume = oldTradeHistory.reduce(
        (sum, h) => sum + (h.volume),
        0
      ) + volumeOrdered
      const totalVolumeXPrice = oldTradeHistory.reduce(
        (sum, h) => sum + (h.price * h.volume),
        0
      ) + (volumeOrdered * newPrice)
      const expectedNewVwap = totalVolumeXPrice/totalVolume
      const res = await chai.request(app).post(`/v1/submit_trade`)
        .send({
          ticker_symbol: oldTickerStats.ticker_symbol,
          price: newPrice,
          volume: volumeOrdered,
          side: "buy", 
        })
      expect(res.status).to.equal(200)
      const newTradeStats = (await db('ticker_statistics').where('ticker_symbol', 'AAPL'))[0]
      expect(expectedNewVwap.toFixed(2)).to.equal((convertStringToValidNumber(newTradeStats.vwap) ?? 0).toFixed(2))
    })
  })

  // TODO -- Updates stats correct

})
