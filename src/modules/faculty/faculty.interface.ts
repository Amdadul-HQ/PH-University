/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface IUserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export type TGender = 'male' | 'female';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface IFaculty {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: IUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty:Types.ObjectId;
  isDeleted: boolean;
}

export interface FacultyModel extends Model<IFaculty> {
  isUserExists(id: string): Promise<IFaculty> | null;
}
