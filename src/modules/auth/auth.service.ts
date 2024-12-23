import { JwtPayload } from "jsonwebtoken"
import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import config from "../../app/config";
import bcrypt from "bcrypt"
import { createToken } from "./auth.utils";
import jwt from "jsonwebtoken"
import { sendEmail } from "../../app/utils/sendEmail";

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
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.rest_pass_ui_link}?id=${isUserExists.id}&token=${resetToken}`;
  // return resetUILink;
  sendEmail(isUserExists.email,resetUILink)
}

const resetPasswordInToDB = async(
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (payload.id !== decoded.userId) {
    console.log(payload.id, decoded.userId);
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

export const AuthServices ={
    loginUserInToDB,changePasswordInToDB,refreshTokenFromDB,forgetPasswordInToDB,resetPasswordInToDB
}