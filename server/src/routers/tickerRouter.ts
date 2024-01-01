import tickerController from "../controllers/tickerController.js"
import {routerFactory, RouterEntry} from "./util.js"


const statRoutes: RouterEntry[] = [
  {
    method: 'post',
    route: '/ticker',
    controllerFn: tickerController.createTicker
  },
]

export default routerFactory(statRoutes)
