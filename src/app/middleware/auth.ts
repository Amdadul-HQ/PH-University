import httpStatus from "http-status";
import { AppError } from "../errors/AppError";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";




const auth = () => {
  return catchAsync(async (req, res, next) => {
    // validation
    const token =req?.headers?.authorization;

    // is token sended
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized');
    }

    // check token is valid
    jwt.verify(token,config.jwt_access_secret as string,function(err,decoded){
        if(err){
           throw new AppError(
             httpStatus.UNAUTHORIZED,
             'You are not authorized',
           );
        }
       
        req.user = decoded as JwtPayload;
    })


    next()
  })
};

export default auth;