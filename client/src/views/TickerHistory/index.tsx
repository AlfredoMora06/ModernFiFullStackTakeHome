import React, { useRef } from "react"
import { Button, Container, Grid, Typography } from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { getTickerStats } from "../../api/tickerStatistics"
import { TickerStatistics } from "../../types/tickerStatistics"
import { TradeHistory } from "../../types/tradeHistory"
import { getTradeHistoryByTicker } from "../../api/tradeHistory"
//@ts-ignore
import modernfi from "../../assets/modernfi.svg"
import { formatDateTimeLongMonth, formatMoney } from "../../libs/format"
import TickerOverview from "./Overview"
import HistoryList from "../../components/HistoryList"


export default function TickerHistory():JSX.Element {
  const [tickerStatistics, setTickerStatistics] = React.useState<TickerStatistics | null>(null)
  const [tickerTradeHistory, setTickerTradeHistory] = React.useState<TradeHistory[]>([])
  const { tickerSymbol } = useParams<{ tickerSymbol: string }>()
  const navigate = useNavigate()
  const overviewRef = useRef<any>()
  const historyListRef = useRef<any>()

  React.useEffect(() => {
    if(tickerSymbol){
      getTickerStats(tickerSymbol).then((res) => {
        if (Array.isArray(res.data) && res.status === 200) {
          // if ticker symbol data is return, show, if not, it means it doesn't exist 
          // and will have to return the user to home page
          if(res.data[0] != null){
            setTickerStatistics(res.data[0])
            getTradeHistoryByTicker(tickerSymbol).then((historyRes) => {
              if(Array.isArray(historyRes.data) && historyRes.status === 200){
                setTickerTradeHistory(historyRes.data)
              }
            })
          } else {
            navigate('/')
          }
        }
      })

    }
  }, [tickerSymbol, navigate])

  const tickerStatsArray: {title: string, content: string}[]  = [
    {
      title: "Highest Price",
      content: formatMoney(tickerStatistics?.highest_price ?? 0)
    },
    {
      title: "Lowest Price",
      content: formatMoney(tickerStatistics?.lowest_price ?? 0)
    },
    {
      title: "Volume Weighted Average Price",
      content: formatMoney(tickerStatistics?.vwap ?? 0)
    }
  ]

  const lastTrade = tickerTradeHistory != null && tickerTradeHistory[0] != null 
    ? tickerTradeHistory[0]
    : null

  const lastTradeTime = lastTrade != null ? formatDateTimeLongMonth(lastTrade.timestamp) : "--"

  const scrollToRef = (targetRef: any) => {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return tickerStatistics != null ? (
    <>
      <Grid container>
        <Grid item container xs={12} md={12}>
          <div
            style={{
              background: "#E7E7E7",
              width: "100%",
            }}
          >
            <Container maxWidth='xl'>
              <Grid container>
                <Grid item xs={6}>
                  <img src={modernfi} alt={modernfi}/>
                </Grid>
                <Grid item xs={6} container justifyContent={"flex-end"} paddingRight={5}>
                  <Button 
                    onClick={() => {
                      navigate("/")
                    }}
                    variant="text" 
                    startIcon={<ArrowBackIcon/>}
                  >
                    Go Back
                  </Button>
                </Grid>
              </Grid>
            </Container>
            <Container sx={{paddingTop: 0}}>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <Typography variant="h1" fontWeight={700}>{tickerSymbol?.toLocaleUpperCase()}</Typography>
                  <Typography sx={{color: "rgba(36, 46, 53, 0.75)"}}>{`As of ${lastTradeTime}`}</Typography>
                </Grid>
                <Grid item xs={12} md={4} container justifyContent={"center"}>
                  {
                    tickerStatsArray.map((tickerStat) => {
                      return (
                        <Grid item xs={6} paddingBottom={4} key={tickerStat.title}>
                          <Typography variant="h6" fontWeight={500} sx={{color: "rgba(36, 46, 53, 0.75)"}}>{tickerStat.title}</Typography>
                          <Typography variant="h6" fontWeight={700}>{tickerStat.content}</Typography>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Grid>
            </Container>
          </div>
        </Grid>
      </Grid>
      <div style={{ backgroundColor: "#4075FE" }}>
        <Container>
          <Grid container>
            <Grid item xs={1.5}>
              <Button
                onClick={() => {scrollToRef(overviewRef)}} 
                variant='text' 
                sx={{color: "white", paddingTop: 2, paddingBottom: 2}} 
                fullWidth
              >
                Overview
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() => {scrollToRef(historyListRef)}} 
                variant='text' 
                sx={{color: "white", paddingTop: 2, paddingBottom: 2}} 
                fullWidth
              >
                Trade History
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div ref={overviewRef}>
        <TickerOverview tickerStatistics={tickerStatistics} tickerTradeHistory={tickerTradeHistory} lastTradeTime={lastTradeTime} />
      </div>

      <div style={{ backgroundColor: "#E7E7E7" }} ref={historyListRef}>
        <Container sx={{paddingBottom: 10}}>
          <HistoryList historyItems={tickerTradeHistory} />
        </Container>
      </div>
    </>
  ) : (<></>)
}
