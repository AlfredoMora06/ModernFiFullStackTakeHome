import statController from "../controllers/statController.js"
import {routerFactory, RouterEntry} from "./util.js"


const statRoutes: RouterEntry[] = [
  {
    method: 'get',
    route: '/stats/:ticker_symbol',
    controllerFn: statController.getTickerStats
  },
]

export default routerFactory(statRoutes)
