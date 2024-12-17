import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../app/config";

const loginuser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUserInToDB(req.body);

    const {refreshToken,accessToken,needsPasswordChange} = result
    res.cookie('refreshToken',refreshToken,{
      secure:config.NODE_ENV ==="production",
      httpOnly:true
    })
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User is logged in succesfully",
        data:{
          accessToken,needsPasswordChange
        }
    })
})

const changePassword = catchAsync(async (req, res) => {

  const {...passwordDate} = req.body

  const result = await AuthServices.changePasswordInToDB(req.user,passwordDate);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User password Update succesfully',
    data: result,
  });
});

export const AuthController = {
  loginuser,
  changePassword
};