import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";


const catchAsync = (fn:RequestHandler) =>{
  return (req:Request,res:Response,next:NextFunction) =>{
    Promise.resolve(fn(req,res,next)).catch(err => next(err))
  }
}


const createStudent = catchAsync(async (req, res,next) => {
  // const zodValidation = studentZodSchema.safeParse(student);
  
  // if (!zodValidation.success) {
    //   res.status(500).json({
      //     success: false,
      //     message: 'Something went wrong',
      //     error: zodValidation.error.format(),
      //   });
      // }
      // will call service func to send this data
  
  const { password,student } = req.body;
  const result = await UserService.createStudentInToDB(password,student);

    // send response
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Student is created Successfully",
        data:result
    })
})


export const UserController = {
    createStudent
}
