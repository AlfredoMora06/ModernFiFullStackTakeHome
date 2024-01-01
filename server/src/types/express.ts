import express from "express"

// P = params, B = request body
export type MfRequest<P=any, B=any> = express.Request<P, any, B>
