import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginuser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUserInToDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User is logged in succesfully",
        data:result
    })
})


export const AuthController = {
  loginuser,
};