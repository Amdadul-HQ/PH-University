/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../app/config";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import { AppError } from "../../app/errors/AppError";
import httpStatus from "http-status";
import { IFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

const createStudentInToDB = async (password:string,studentData: IStudent) => {


    const userData : Partial<IUser> = {};
    userData.password = password || (config.default_pass as string);

    const session = await mongoose.startSession();

    try{

    session.startTransaction()

    const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
    );

    userData.role = 'student';
    // manulally generate id
    userData.id = await generateStudentId(admissionSemester as IAcademicSemester);

    //

    const newUser = await User.create([userData],{session});

    // create a student
    if (!newUser.length) {
    // set id,_id as user
        throw new AppError(httpStatus.BAD_REQUEST,'Faild to create user')
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id; //reference _id

    const newStudent = await Student.create([studentData],{session});

    if(!newStudent){
        throw new AppError(httpStatus.BAD_REQUEST,'Faild to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent;

    }catch (err :any){
        if(err){
            await session.abortTransaction();
            await session.endSession()
            throw new Error(err)
        }
    }

   
};


// Create Faculty - 
const createFacultyInToDB = async (password:string,payload:IFaculty) =>{

    // create a user Object

    const userData:Partial<IUser> = {};

    // if password is not given , user defatul password
    userData.password = password || (config.default_pass as string);

    // set user role 
    userData.role = 'faculty';

    // fine academic department info 
    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);

    if(!academicDepartment){
        throw new AppError(400,'Academic Department not found');
    }

    const session = await mongoose.startSession()

    try{
        session.startTransaction();

        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await User.create([userData],{session});

        // create a faculty
        if(!newUser.length){
            throw new AppError(httpStatus.BAD_REQUEST,'Failed to create user');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id


        // create a faculty 
        const newFaculty = await Faculty.create([payload],{session});

        if(!newFaculty.length){
            throw new AppError(httpStatus.BAD_REQUEST,'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();


        return newFaculty;
    }
    catch(err:any){
        await session.abortTransaction();
        await session.endSession();
        throw  new Error(err);
    }

}



const getAllUserFromDB = async()=>{
    const result = await User.find();
    return result
}


const createAdminInToDB = async(password:string,payload:IAdmin)=>{
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
}

export const UserService = {
    createStudentInToDB,
    getAllUserFromDB,
    createFacultyInToDB,
    createAdminInToDB
}