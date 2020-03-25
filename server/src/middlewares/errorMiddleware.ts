import { Request, Response, NextFunction } from 'express'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import HttpException from '../exceptions/HttpException'

const errorMiddleware = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res
    .status(err.status || INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message, error: err.errors })
}

export default errorMiddleware
