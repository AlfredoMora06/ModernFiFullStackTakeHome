import tickerController from "../controllers/tickerController.js"
import {routerFactory, RouterEntry} from "./util.js"

/* Created this endpoint because due to Michael Mutscheller's email feedback
 * there's no need to verify the tickers and the user should populate the database.
 * Based on that the user should be able to create tickers. Otherwise the user would 
 * never be able to make trades.
 */

const statRoutes: RouterEntry[] = [
  {
    method: 'post',
    route: '/ticker',
    controllerFn: tickerController.createTicker
  },
]

export default routerFactory(statRoutes)
