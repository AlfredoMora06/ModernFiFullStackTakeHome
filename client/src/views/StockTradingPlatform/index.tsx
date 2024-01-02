import React from "react"
import { Button, Container, Grid, TextField, Typography  } from "@mui/material"
import { useSnackbar } from "notistack"
import { Formik, Form } from "formik"
import ErrorIcon from '@mui/icons-material/Error'

import FormSmallContainer from "../../components/Fields/FormSmallContainer"
//@ts-ignore
import Dialog from "../../components/Dialog"
import { getTickerStats } from "../../api/tickerStatistics"
import { TickerStatistics } from "../../types/tickerStatistics"
import RealTimeQuote from "./RealTimeQuote"
import { TradeSide } from "../../types/trade"
import BuySellTrade from "./BuySellTrade"
//@ts-ignore
import modernfi from "../../assets/modernfi.svg"
import { getTradeHistoryByTicker } from "../../api/tradeHistory"
import { TradeHistory } from "../../types/tradeHistory"
import { createTicker } from "../../api/ticker"


export type DialogTypes = TradeSide | null | 'quote'

export default function StockTradingPlatform():JSX.Element {
  const [tickerStatistics, setTickerStatistics] = React.useState<TickerStatistics | null>(null)
  const [tickerTradeHistory, setTickerTradeHistory] = React.useState<TradeHistory[] | null>(null)
  const [openPrompt, setOpenPrompt] = React.useState<DialogTypes>(null)
  const {enqueueSnackbar} = useSnackbar()

  const openQuoteDialog = async (ticker_symbol: string): Promise<void> => {
    try {
      const res = await getTickerStats(ticker_symbol)
      if(Array.isArray(res.data) && res.status === 200){
        // check if ticker exists, if not create one...
        if(res.data[0] != null){
          setTickerStatistics(res.data[0])
          const historyRes = await getTradeHistoryByTicker(ticker_symbol)
          if(Array.isArray(historyRes.data) && historyRes.status === 200){
            setTickerTradeHistory(historyRes.data)
          } else {
            enqueueSnackbar("Had trouble retrieving the ticker's trade history", {variant: "error"})
          }
          setOpenPrompt('quote')
        } else {
          const createTickerRes = await createTicker(ticker_symbol)
          if(createTickerRes.status === 200){
            // Ticker trade history is null since it was just created
            setTickerTradeHistory(null)
            setTickerStatistics(createTickerRes.data.tickerStats)
            setOpenPrompt('quote')
          } else {
            enqueueSnackbar("Had trouble retrieving the ticker statistics", {variant: "error"})
          }
        }
      } else {
        enqueueSnackbar("Had trouble retrieving the ticker statistics", {variant: "error"})
      }
    } catch (_) {
      enqueueSnackbar("Had trouble retrieving the ticker statistics", {variant: "error"})
    }
  }

  const openBuySell = (side: TradeSide): void => {
    setOpenPrompt(side)
  }

  const closeDialog = () => {
    setOpenPrompt(null)
  }

  return (
    <>
      <Grid container>
        <Grid item container xs={12} md={12}>
          <div
            style={{
              background: "#E7E7E7",
              height: "100vh",
              width: "100%",
            }}
          >
            <Container maxWidth='xl'>
              <Grid container>
                <Grid item xs={3}>
                  <img src={modernfi} alt={modernfi}/>
                </Grid>
              </Grid>
            </Container>
            <Container sx={{paddingTop: 20}}>
              <Grid>
                <Grid item xs={12}>
                  <Typography textAlign={"center"} variant="h2" fontWeight={700}>Buy & sell</Typography>
                  <Typography textAlign={"center"} variant="h3">Put your goals into action</Typography>
                </Grid>
  
                <Grid item xs={12}>
                  <Formik<{ticker_symbol: string}>
                    validateOnChange={false}
                    initialValues={{ticker_symbol: ""}}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      setSubmitting(true)
                      openQuoteDialog(values.ticker_symbol)
                      resetForm()
                      setSubmitting(false)
                    }}
                  >
                    {({
                      handleBlur,
                      handleChange,
                      isSubmitting,
                      values,
                    }) => {
                      return (
                        <Form>
                          <FormSmallContainer>
                            <Grid container paddingTop={5}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label={"Enter Ticker Symbol"}
                                  name="ticker_symbol"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.ticker_symbol}
                                  required={true}
                                  inputProps={{ style: { textTransform: "uppercase" } }}
                                />
                              </Grid>
                              { tickerStatistics === undefined 
                                ? <Grid container>
                                    <ErrorIcon fontSize={"small"} sx={{color: "#BA3D20", marginTop: 0.2}} />
                                    <Typography fontSize={15} sx={{color: "#BA3D20", paddingLeft: 1}}> Error: Unable to access this ticker.</Typography>
                                  </Grid>
                                : <></>
                              }
                              <Grid item container justifyContent="flex-end" xs={12} paddingTop={6}>
                                <Button 
                                  disabled={isSubmitting}
                                  type="submit"
                                  variant="contained" 
                                  size="large"
                                  sx={{backgroundColor: "#4075FE", color: "white", borderRadius: 5}}
                                >
                                  Get Quote
                                </Button>
                              </Grid>
                            </Grid>
                          </FormSmallContainer>
                        </Form>
                      )
                    }}  
                  </Formik>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={openPrompt === "quote"}
        onClose={closeDialog}
        maxWidth={'sm'}
        title={"Real-time quote"}
      >
        { tickerStatistics != null
          ? <RealTimeQuote 
            tickerStatistics={tickerStatistics}
            openBuySellDialog={openBuySell} 
            tickerTradeHistory={tickerTradeHistory}
          />
          : <></>
        }
      </Dialog>
      <Dialog
        open={openPrompt === "buy"}
        onClose={closeDialog}
        maxWidth={'lg'}
      >
        { tickerStatistics != null
          ? <BuySellTrade 
            tickerStatistics={tickerStatistics} 
            side="buy" 
            setOpenPrompt={setOpenPrompt}
            tickerTradeHistory={tickerTradeHistory}
          />
          : <></>
        }
      </Dialog>
      <Dialog open={openPrompt === "sell"} onClose={closeDialog} maxWidth={'lg'}>
        { tickerStatistics != null
          ? <BuySellTrade 
            tickerStatistics={tickerStatistics} 
            side="sell"
            setOpenPrompt={setOpenPrompt}
            tickerTradeHistory={tickerTradeHistory}
          />
          : <></>
        }
      </Dialog>
    </>
  )
}
