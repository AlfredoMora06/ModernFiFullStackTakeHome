import React from "react"
import { Button, Grid, TextField, Typography  } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"
import * as Yup from "yup"
import { useSnackbar } from "notistack"

import { Formik, Form } from "formik"
import FormSmallContainer from "../../../components/Fields/FormSmallContainer"
import { TickerStatistics } from "../../../types/tickerStatistics"
import { TradeSide } from "../../../types/trade"
import { submitTrade } from "../../../api/trade"
import { convertToNumber } from "../../../util/number"
import { DialogTypes } from ".."


export interface SubmitTradeFormFields {
  ticker_symbol: string,
  side: TradeSide, 
  price: string, 
  volume: string,
}

type BuySellTradeFormProps = {
  tickerStatistics: TickerStatistics,
  side: TradeSide,
  setOpenPrompt: (open: DialogTypes) => void,
}


export default function BuySellTradeForm(
  {tickerStatistics, side, setOpenPrompt}: BuySellTradeFormProps
):JSX.Element {
  const {enqueueSnackbar} = useSnackbar()


  return (
    <Grid item xs={12} md={6}>
      <Grid item container justifyContent={"center"}>
        <Typography 
          variant="h4" 
          fontWeight={500} 
          marginBottom={3} 
          textTransform="capitalize"
        >
          {`${side} Transaction`}
        </Typography>
      </Grid>
      <Formik<SubmitTradeFormFields>
        validateOnChange={false}
        initialValues={{
          ticker_symbol: tickerStatistics.ticker_symbol,
          side: side,
          price: "",
          volume: "",
        }}
        validationSchema={Yup.object().shape({
          price: Yup.number()
            .required("A price is required")
            .moreThan(0, "Price must be more than $0"),
          volume: Yup.number()
            .required("Volume is required")
            .moreThan(0, "Must buy at least one share"),
        })}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true)
          try {
            const res = await submitTrade({
              ticker_symbol: values.ticker_symbol,
              side: values.side, 
              price: convertToNumber(values.price) ?? 0, 
              volume: convertToNumber(values.volume) ?? 0,
            })
            if(res.status === 200){
              enqueueSnackbar("Succesfully submitted the trade", {variant: "success"})
              setOpenPrompt(null)
            } else {
              enqueueSnackbar("Had trouble submitting the trade", {variant: "error"})
            }
          } catch (_) {
            enqueueSnackbar("Had trouble submitting the trade", {variant: "error"})
          }
          resetForm()
          setSubmitting(false)
        }}
      >
        {({
          resetForm,
          handleBlur,
          handleChange,
          values,
          touched,
          errors
        }) => {
          return (
            <Form>
              <FormSmallContainer>
                <Grid container justifyContent={"center"}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label={"Ticker Symbol"}
                      name="ticker_symbol"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.ticker_symbol}
                      required={true}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={10} paddingTop={3}>
                    <TextField
                      fullWidth
                      label={"Side"}
                      name="side"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.side}
                      required={true}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={10} paddingTop={3}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                      label={"Price"}
                      name="price"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      required={true}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={10} paddingTop={3}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.volume && errors.volume)}
                      helperText={touched.volume && errors.volume}
                      label={"Volume"}
                      name="volume"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.volume}
                      required={true}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">Share(s)</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid 
                    container 
                    item 
                    xs={5} 
                    alignContent="center" 
                    justifyContent="flex-start"
                    paddingTop={4}
                  >
                    <Button
                      onClick={() => {
                        resetForm()
                        setOpenPrompt("quote")
                      }}
                      size="small"
                      variant="text"
                    >
                      Go Back
                    </Button>
                  </Grid>

                  <Grid 
                    container 
                    item 
                    xs={5} 
                    alignContent="center" 
                    justifyContent="flex-end"
                    paddingTop={4}
                  >
                    <Button type="submit" sx={{textTransform: "uppercase"}}>
                      {side}
                    </Button>
                  </Grid>
                </Grid>
              </FormSmallContainer>
            </Form>
          )
        }}  
      </Formik>
    </Grid>
  )
}
