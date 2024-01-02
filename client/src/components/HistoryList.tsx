import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { TradeHistory } from "../types/tradeHistory"
import HistoryListItem from "./HistoryListItem"


interface HistoryListProps {
  historyItems: TradeHistory[]
}

export default function HistoryList({historyItems}: HistoryListProps) {
  return historyItems && historyItems.length ? (
    <Box>
      <Typography variant="h2" sx={{ mb: 3, fontWeight: 500 }}>
        Trade History
      </Typography>
      <Box>
        {historyItems.map((item) => (
          <HistoryListItem key={item.timestamp} item={item} />
        ))}
      </Box>
    </Box>
  ) : (<></>)
}
