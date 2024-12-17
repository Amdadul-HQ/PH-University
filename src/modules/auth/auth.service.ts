import jwt from "jsonwebtoken"
import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import config from "../../app/config";

const loginUserInToDB = async(payload:ILoginUser)=>{

    // checking if the user is exist
    const isUserExists = await User.isUserExistsByCustomId(payload.id)

    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,"This user is not found!")
    };
    const isDeleted = isUserExists?.isDeleted
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,'This User is Already Deleted!')
    }
    const userStatus = isUserExists.status;

    if(userStatus === "blocked"){
        throw new AppError(httpStatus.FORBIDDEN,'This user is Blocked')
    };

    if(! await User.isPasswordMatched(payload.password,isUserExists.password)){
        throw new AppError(httpStatus.FORBIDDEN,'Password not matched')
    }

    const jwtPayload = {
        userId:isUserExists.id,
        role:isUserExists.role
    }

    //create token and send to client
    const accessToken = jwt.sign(jwtPayload,
    config.jwt_access_secret as string,
    {expiresIn:'10d'}
    );



    return{
        accessToken,
        needsPasswordChange:isUserExists?.needsPasswordChange
    }
}

export const AuthServices ={loginUserInToDB}