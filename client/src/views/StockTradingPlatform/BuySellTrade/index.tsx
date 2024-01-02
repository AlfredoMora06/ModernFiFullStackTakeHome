import React from "react"
import { Grid } from "@mui/material"

import { TickerStatistics } from "../../../types/tickerStatistics"
import BuySellTradeForm from "./BuySellTradeForm"
import { TradeSide } from "../../../types/trade"
import RealTimeInfo from "../RealTimeInfo"
import { TradeHistory } from "../../../types/tradeHistory"
import { DialogTypes } from ".."


type BuySellTradeProps = {
  tickerStatistics: TickerStatistics,
  side: TradeSide,
  setOpenPrompt: (open: DialogTypes) => void,
  tickerTradeHistory: TradeHistory[] | null
}

export default function BuySellTrade(
  {tickerStatistics, side, setOpenPrompt, tickerTradeHistory}: BuySellTradeProps
):JSX.Element {

  return (
    <Grid container>
      <Grid container item xs={12} md={6}>
        <RealTimeInfo tickerStatistics={tickerStatistics} tickerTradeHistory={tickerTradeHistory}/>
      </Grid>

      <BuySellTradeForm 
        tickerStatistics={tickerStatistics} 
        side={side} 
        setOpenPrompt={setOpenPrompt}
      />
    </Grid>
  )
}