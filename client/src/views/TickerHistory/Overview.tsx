import React from "react"
import { Container, Grid, Typography } from "@mui/material"
import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts'

import { TradeHistory } from "../../types/tradeHistory"
import { formatDateTimeShort, formatMoney } from "../../libs/format"
import { convertToNumber } from "../../util/number"
import { TickerStatistics } from "../../types/tickerStatistics"


type TickerOverviewProps = {
  tickerStatistics: TickerStatistics,
  tickerTradeHistory: TradeHistory[],
  lastTradeTime: string | null,
}


export default function TickerOverview({tickerStatistics, tickerTradeHistory, lastTradeTime}: TickerOverviewProps):JSX.Element {

  const tickerGraphHistory = tickerTradeHistory.map((h) => {
    if(h.side === "buy"){
      return {
        timestamp: h.timestamp,
        buyPrice: h.price,
        buyVolume: h.volume
      }
    } else {
      return {
        timestamp: h.timestamp,
        sellPrice: h.price,
        sellVolume: h.volume
      }
    }
  })

  let highestVolume = 0
  
  tickerTradeHistory.forEach((h) => {
    if (h.volume > highestVolume) 
      highestVolume = h.volume
  })
 

  return (
    <>
      <Grid container>
        <Grid item container xs={12} md={12}>
          <div
            style={{
              background: "#E7E7E7",
              width: "100%",
            }}
          >
            <Container sx={{paddingTop: 10, paddingBottom: 10}}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h2" fontWeight={500}>Overview</Typography>
                </Grid>

                <Grid item xs={12} paddingTop={6}>
                  <Typography variant="h4" fontWeight={500}>Price chart</Typography>
                  <Typography sx={{color: "rgba(36, 46, 53, 0.75)"}}>{`As of ${lastTradeTime}`}</Typography>
                </Grid>
              </Grid>

              <Grid container paddingTop={5}>
                <Grid item xs={8}>
                  <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={tickerGraphHistory}>                     
                      <CartesianGrid stroke="#F0F0F0" />
                      <Tooltip 
                        labelFormatter={t => formatDateTimeShort(t)}
                        formatter={(value: string) => { return formatMoney(convertToNumber(value) ?? 0)}}
                      />
                      <XAxis
                        axisLine={{stroke:"black"}}
                        dy={5}
                        dataKey={'timestamp'}
                        tick={{fill: '#A3A3A3', fontSize: 14}}
                        tickLine={false}
                        tickFormatter={(timestamp) => {return formatDateTimeShort(timestamp)}}
                      />
                      <YAxis
                        axisLine={{stroke:"black"}}
                        dx={-5}
                        tick={{fill: 'black', fontSize: 15,}}
                        domain={[0, convertToNumber(tickerStatistics.highest_price) ?? 0]}
                      />
                      <Bar 
                        name={"Buy"}
                        dataKey={'buyPrice'}
                        strokeWidth={3}
                        stroke="green"
                        fill="green"
                      />
                      <Bar 
                        name={"Sell"}
                        dataKey={'sellPrice'}
                        strokeWidth={3}
                        stroke="red"
                        fill="red"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} paddingTop={6}>
                  <Typography variant="h4" fontWeight={500}>Volume chart</Typography>
                  <Typography sx={{color: "rgba(36, 46, 53, 0.75)"}}>{`As of ${lastTradeTime}`}</Typography>
                </Grid>
              </Grid>

              <Grid container paddingTop={5}>
                <Grid item xs={8}>
                  <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={tickerGraphHistory}>                     
                      <CartesianGrid stroke="#F0F0F0" />
                      <Tooltip 
                        labelFormatter={t => formatDateTimeShort(t)}
                        formatter={(value: string) => { return `${value} Shares`}}
                      />
                      <XAxis
                        axisLine={{stroke:"black"}}
                        dy={5}
                        dataKey={'timestamp'}
                        tick={{fill: '#A3A3A3', fontSize: 14}}
                        tickLine={false}
                        tickFormatter={(timestamp) => {return formatDateTimeShort(timestamp)}}
                      />
                      <YAxis
                        axisLine={{stroke:"black"}}
                        dx={-5}
                        tick={{fill: 'black', fontSize: 15,}}
                        domain={[0, highestVolume]}
                      />
                      <Bar 
                        name={"Buy"}
                        type="linear"
                        dataKey={'buyVolume'}
                        strokeWidth={3}
                        stroke="green"
                        fill="green"
                      />
                      <Bar 
                        name={"Sell"}
                        type="linear"
                        dataKey={'sellVolume'}
                        strokeWidth={3}
                        stroke="red"
                        fill="red"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
              </Grid>
              
            </Container>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
