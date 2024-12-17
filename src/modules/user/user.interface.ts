/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IUser {
    id:string,
    password:string,
    needsPasswordChange:boolean,
    role:'admin' | 'student' | 'faculty',
    status:'in-progress' | 'blocked',
    isDeleted:boolean,
}

export interface IUserModel extends Model<IUser> {
  isUserExistsByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(plainTextPassword:string,hashedPassword:string):Promise<boolean>
}
