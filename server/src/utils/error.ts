import express from "express"
import { MfRequest } from "../types/express";

export class HttpError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message);
    this.status = status
  }
}

export function handleControllerError(
  err: Error | HttpError,
  req: MfRequest,
  res: express.Response
): void {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.message)
  } else {
    // otherwise, unexpected error
    res.status(500).send('Sorry, we cannot process your request at this time')
  }
}

export function addErrorHandlingToControllerMethod(
  controllerMethod: (req: MfRequest, res: express.Response, next: express.NextFunction) => Promise<void>
): (req: MfRequest, res: express.Response, next: express.NextFunction) => Promise<void> {
  return (req: MfRequest, res: express.Response, next: express.NextFunction) => {
    return controllerMethod(req, res, next).catch((e) => handleControllerError(e, req, res))
  }
}

export function addErrorHandlingToController(
  controller: {[key: string]: (req: MfRequest, res: express.Response, next: express.NextFunction) => Promise<void>}
): {[key: string]: (req: MfRequest, res: express.Response, next: express.NextFunction) => Promise<void>} {
  return Object.keys(controller).reduce(
    (
      newController: {[key: string]: (req: MfRequest, res: express.Response, next: express.NextFunction) => Promise<void>},
      controllerMethodName
    ) => {
      newController[controllerMethodName] = addErrorHandlingToControllerMethod(controller[controllerMethodName])
      return newController
    },
    {}
  )
}
