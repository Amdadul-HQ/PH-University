import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../app/builder/QueryBuilder";

const createSemesterRegistrationInToDB = async(payload:ISemesterRegistration) =>{
    
    const academicSemester = payload.academicSemester
    
    const isSemesterRegistrationExists =await SemesterRegistration.findOne({academicSemester})
    
    if(isSemesterRegistrationExists){
        throw new AppError(httpStatus.CONFLICT,'This Semester is already registered!')
    }
    
    // chec if the semseter is exist
    
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
    
    if(!isAcademicSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND,'This Academic Semester not found!')
    };

    const result = await SemesterRegistration.create(payload)

    return result;
}

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
    const semesterRegistrationQuery = new QueryBuilder(
      SemesterRegistration.find().populate('academicSemester'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await semesterRegistrationQuery.modelQuery;
    return result;
};


const getSingleSemesterRegistrationFromDB = async(id:string)=>{

    const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
    return result
}



export const SemesterRegistrationService = {
    createSemesterRegistrationInToDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB
}