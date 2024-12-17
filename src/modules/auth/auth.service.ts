import bcrypt from 'bcrypt'
import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

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

    //create token and send to client
    
    return{}
}

export const AuthServices ={loginUserInToDB}