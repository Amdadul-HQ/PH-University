import mongoose from "mongoose";
import config from "../../app/config";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import { AppError } from "../../app/errors/AppError";
import httpStatus from "http-status";

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

    }catch (err){
        if(err){
            await session.abortTransaction();
            await session.endSession()
            throw new Error(err)
        }
    }

   
};


const getAllUserFromDB = async()=>{
    const result = await User.find();
    return result
}

export const UserService = {
    createStudentInToDB,
    getAllUserFromDB
}