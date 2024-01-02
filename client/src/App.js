import React from "react"
import { Routes, Route } from "react-router-dom"

import "./App.css";
import StockTradingPlatform from "./views/StockTradingPlatform"
import TickerHistory from "./views/TickerHistory"

function App() {
  return (
    <>
      <Routes>
        <Route path="/0/history/:tickerSymbol" element={<TickerHistory />} />
        <Route
          path="*"
          element={<StockTradingPlatform to="/0/home" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
