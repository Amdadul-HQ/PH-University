import { Types } from "mongoose";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterInToDB = async(payload :IAcademicSemester) =>{

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error("Invalid Semester Code!")
    }

    const result = await AcademicSemester.create(payload);

    return result;
}

// Get All Academic Semester 
const getAcademicSemesterFromDB = async()=> {
    const result = await AcademicSemester.find();
    return result
}

// Get Singel Academic Semester
const getSingleAcademicSemeterFromDB = async(id:Types.ObjectId)=>{

    const result = await AcademicSemester.findOne({_id:id});
    return result
}


export const AcademicSemesterServices = {
    createAcademicSemesterInToDB,
    getAcademicSemesterFromDB,
    getSingleAcademicSemeterFromDB
}