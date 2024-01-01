import express from "express"
import * as core from "express-serve-static-core";

import { MfRequest } from "../types/express";

export interface RouterEntry {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  route: string,
  controllerFn: (req: MfRequest, res: express.Response, next: express.NextFunction) => Promise<any>
}

export function routerFactory(routes: RouterEntry[]): core.Router {
  const router = express.Router()
  for (let route of routes) {
    // @ts-ignore
    router[route.method](route.route, route.controllerFn)
  }
  return router
}
