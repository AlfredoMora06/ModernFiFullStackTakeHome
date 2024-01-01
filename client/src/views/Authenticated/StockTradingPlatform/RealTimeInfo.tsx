import React from "react"
import { Grid, Typography } from "@mui/material"

import { TickerStatistics } from "../../../types/tickerStatistics"
import { formatDateTimeLongMonth, formatMoney } from "../../../libs/format"
import { TradeHistory } from "../../../types/tradeHistory"

type RealTimeQuoteProps = {
  tickerStatistics: TickerStatistics
  tickerTradeHistory: TradeHistory[] | null
}

export default function RealTimeInfo(
  {tickerStatistics, tickerTradeHistory}: RealTimeQuoteProps
):JSX.Element {
  const {ticker_symbol, highest_price, lowest_price, vwap} = tickerStatistics
  const lastTrade = tickerTradeHistory != null && tickerTradeHistory[0] != null 
    ? tickerTradeHistory[0]
    : null


  const tickerStatsArray: {title: string, content: string}[]  = [
    {
      title: "Highest Price",
      content: formatMoney(highest_price)
    },
    {
      title: "Lowest Price",
      content: formatMoney(lowest_price)
    },
    {
      title: "Volume Weighted Average Price",
      content: formatMoney(vwap)
    }
  ]

  return (
    <Grid container item>
      <Grid item xs={12} paddingBottom={2} borderBottom={3} borderColor={"rgba(36, 46, 53, 0.75)"}>
        <Typography variant="h5" fontWeight={700} marginBottom={1}>{ticker_symbol}</Typography>
        { lastTrade != null
          ? <>
            <Typography fontSize={15} sx={{color: "rgba(36, 46, 53, 0.75)"}}>
              {`Last trade: ${formatDateTimeLongMonth(lastTrade.timestamp)}`}
            </Typography>
            <Typography fontSize={15} sx={{color: "rgba(36, 46, 53, 0.75)"}}>
              {`Last size: ${lastTrade.volume}`}
            </Typography>
          </>
          : <></>
        }
      </Grid>
      {
        tickerStatsArray.map((tickerStat) => {
          return (
            <Grid item xs={12} paddingTop={3} key={tickerStat.title}>
              <Typography variant="h6" fontWeight={500} sx={{color: "rgba(36, 46, 53, 0.75)"}}>{tickerStat.title}</Typography>
              <Typography variant="h6" fontWeight={700}>{tickerStat.content}</Typography>
            </Grid>
          )
        })
      }
    </Grid>
  )
}