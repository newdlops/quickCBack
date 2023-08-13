import { NextFunction, Request, RequestHandler, Response } from 'express'

// utils/async-handler.js:
export default function asyncHandler(requestHandler: (req : Request, res: Response)=>Promise<void>): RequestHandler{
  return (req: Request, res: Response, next: NextFunction) => {
    requestHandler(req, res).then(r => r).catch(err=>next(err))
  }
}