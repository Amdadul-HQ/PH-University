import { JwtPayload } from "jsonwebtoken"
import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import config from "../../app/config";
import bcrypt from "bcrypt"
import { createToken } from "./auth.utils";
import jwt from "jsonwebtoken"

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
    const accessToken = createToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_expire as string)

    const refreshToken = createToken(jwtPayload,config.jwt_refresh_secret as string,config.jwt_refresh_expire as string)



    return{
        accessToken,
        refreshToken,
        needsPasswordChange:isUserExists?.needsPasswordChange
    }
}


const changePasswordInToDB = async(user:JwtPayload,payload:{oldPassword:string,newPassword:string}) =>{

    const isUserExists = await User.isUserExistsByCustomId(user.userId);

    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }
    const isDeleted = isUserExists?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This User is Already Deleted!');
    }
    const userStatus = isUserExists.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
    }

    if (
      !(await User.isPasswordMatched(payload.oldPassword, isUserExists.password))
    ) {
      throw new AppError(httpStatus.FORBIDDEN, 'Password not matched');
    }


    // hash new password
    const newHashedPassword = await bcrypt.hash(payload.newPassword,Number(config.bycrypt_salt_rounds))
    
    
    
    await User.findOneAndUpdate({
        id:user.userId,
        role:user.role
    },{
        password:newHashedPassword,
        needsPasswordChange:false,
        passwordChangeAt:new Date(),
    })
    return null
}

const refreshTokenFromDB =async(token:string)=>{

            
        const decoded = jwt.verify(
          token,
          config.jwt_refresh_secret as string,
        ) as JwtPayload;
    
    
         const {userId,iat} = decoded

    
         const isUserExists = await User.isUserExistsByCustomId(userId)
        
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
    
            if(isUserExists.passwordChangeAt && await User.isJWTIssuedBeforePasswordChanged(isUserExists.passwordChangeAt,iat as number)){
              throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized...")
            }

             const jwtPayload = {
               userId: isUserExists.id,
               role: isUserExists.role,
             };

             //create token and send to client
             const accessToken = createToken(
               jwtPayload,
               config.jwt_access_secret as string,
               config.jwt_access_expire as string,
             );

             return {accessToken}
}

const forgetPasswordInToDB = async(id:string)=>{


  const isUserExists = await User.isUserExistsByCustomId(id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Already Deleted!');
  }
  const userStatus = isUserExists.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
  }

   const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
   };

  //create token and send to client
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `http://localhost:5000?id=${isUserExists.id}token=${accessToken}`;
  console.log(resetUILink);
}

export const AuthServices ={
    loginUserInToDB,changePasswordInToDB,refreshTokenFromDB,forgetPasswordInToDB
}