import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css"
import StockTradingPlatform from "./views/Authenticated/StockTradingPlatform";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={<StockTradingPlatform to="/0/home" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
