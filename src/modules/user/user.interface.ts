/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  id: string;
  email: string;
  password: string;
  passwordChangeAt?: Date;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUserExistsByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
