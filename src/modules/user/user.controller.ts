import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { password,student } = req.body;

    // const zodValidation = studentZodSchema.safeParse(student);

    // if (!zodValidation.success) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: zodValidation.error.format(),
    //   });
    // }
    // will call service func to send this data
    const result = await UserService.createStudentInToDB(password,student);

    // send response
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Student is created Successfully",
        data:result
    })
  } catch (error) {
   next(error)
  }
};


export const UserController = {
    createStudent
}
