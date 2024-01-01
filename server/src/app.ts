#!/user/bin/env node
import express from "express"
import cors from "cors"

import * as routes from "./routers/index.js"
import { convertQueryOperators, companyIdFromHeaders } from "./middlewares/index.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(convertQueryOperators)
app.use(companyIdFromHeaders)

app.use("/v1", routes.statRouter)
app.use("/v1", routes.tradeRouter)
app.use("/v1", routes.tradeHistoryRouter)


export default app
