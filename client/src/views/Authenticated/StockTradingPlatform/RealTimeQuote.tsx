import React from "react"
import { Button, Grid } from "@mui/material"

import { TickerStatistics } from "../../../types/tickerStatistics"
import { TradeSide } from "../../../types/trade"
import { TradeHistory } from "../../../types/tradeHistory"
import RealTimeInfo from "./RealTimeInfo"

type RealTimeQuoteProps = {
  tickerStatistics: TickerStatistics
  openBuySellDialog: (side: TradeSide) => void,
  tickerTradeHistory: TradeHistory[] | null
}

export default function RealTimeQuote(
  {tickerStatistics, openBuySellDialog, tickerTradeHistory}: RealTimeQuoteProps
):JSX.Element {

  return (
    <>
      <Grid container>
        <RealTimeInfo tickerStatistics={tickerStatistics} tickerTradeHistory={tickerTradeHistory}/>
  
        <Grid item container justifyContent="flex-end" xs={12} paddingTop={6}>
          <Button
            variant="contained" 
            size="large"
            onClick={() => {openBuySellDialog('buy')}}
            sx={{backgroundColor: "#4075FE", color: "white", borderRadius: 5, marginRight: 2}}
          >
            Buy
          </Button>
          <Button
            variant="contained" 
            size="large"
            onClick={() => {openBuySellDialog('sell')}}
            sx={{backgroundColor: "#4075FE", color: "white", borderRadius: 5}}
          >
            Sell
          </Button>
        </Grid>
      </Grid>
    </>
  )
}