/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHander = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction)=> {
  const statusCode = 500;
  const message = err.message || 'Something went worng';

    res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHander;