import tradeController from "../controllers/tradeController.js"
import {routerFactory, RouterEntry} from "./util.js"


const tradeRoutes: RouterEntry[] = [
  {
    method: 'post',
    route: '/submit_trade',
    controllerFn: tradeController.submitTrade
  },
]

export default routerFactory(tradeRoutes)
