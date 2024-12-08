/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHander :ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next)=> {
  let statusCode = err.ststusCode ||  500;
  let message = err.message || 'Something went worng';
  

  
  let errorSources:TErrorSource = [{
    path:'',
    message:'Something went wrong'
  }]

  const handleZodError = (err:ZodError) =>{
    const errorSources :TErrorSource = err.issues.map((issue:ZodIssue)=>{
      return {
        path:issue?.path[issue.path.length -1],
        message:issue.message,
      }
    })
      statusCode = 400;
    return{
      statusCode,
      message:'Validation Error',
      errorSources
    }
  }


  if(err instanceof ZodError){

    const simplifiedError = handleZodError(err)

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources

    // statusCode = 400,
  }

    res.status(statusCode).json({
    success: false,
    message,
    errorSources
  });
};

export default globalErrorHander;