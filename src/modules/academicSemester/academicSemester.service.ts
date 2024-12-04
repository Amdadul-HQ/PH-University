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

const getAcademicSemesterFromDB = async()=> {
    const result = await AcademicSemester.find();
    return result
}


export const AcademicSemesterServices = {
    createAcademicSemesterInToDB,
    getAcademicSemesterFromDB
}