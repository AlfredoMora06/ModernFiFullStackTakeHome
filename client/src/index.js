import React from "react"
import { SnackbarProvider } from "notistack"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider, StyledEngineProvider } from "@mui/material"

import App from "./App"
import SnackbarCloseButton from "./components/SnackbarCloseButton"
import theme from "./theme"


ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
