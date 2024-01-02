import tradeHistoryController from "../controllers/tradeHistoryController.js"
import {routerFactory, RouterEntry} from "./util.js"


const tradeHistoryRoutes: RouterEntry[] = [
  {
    method: 'get',
    route: '/trade_history/:ticker_symbol',
    controllerFn: tradeHistoryController.getTradeHistoryByTicker
  },
]

export default routerFactory(tradeHistoryRoutes)
