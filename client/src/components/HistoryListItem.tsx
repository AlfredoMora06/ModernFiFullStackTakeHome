import React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { TradeHistory } from "../types/tradeHistory"
import { formatDateTimeLongMonth, formatMoney } from "../libs/format"


interface HistoryListItemProps {
  item: TradeHistory
}

export default function HistoryListItem({item}: HistoryListItemProps) {
  const {
    side,
    price,
    volume,
    timestamp
  } = item


  return (
    <Box sx={{ borderTop: 1, borderColor: "grey.400", p: 2 }}>
      <Grid container justifyContent="flex-start">
        <Grid item xs={12} md={8}>
          <Typography
            style={{
              color: "#000000de",
              fontWeight: 700,
              paddingBottom: 5,
              whiteSpace: 'pre-wrap'
            }}
          >
            {side.toLocaleUpperCase()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12}>
            <Typography sx={{whiteSpace: 'pre-wrap'}}>
              {`At ${formatMoney(price)}`}
            </Typography>
          </Grid>

          <Grid item xs={12} container alignItems="flex-end">
            <Typography sx={{ fontWeight: 700, color: "grey.600" }}>
              {`${volume} Shares`}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} md={6} justifyContent="flex-end" alignItems="flex-end">
          <Typography sx={{ color: "grey.600", fontSize: 15 }}>
            {`On ${formatDateTimeLongMonth(timestamp)}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
