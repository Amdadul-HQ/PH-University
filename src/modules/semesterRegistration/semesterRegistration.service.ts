import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../app/builder/QueryBuilder";

const createSemesterRegistrationInToDB = async(payload:ISemesterRegistration) =>{
    
    const academicSemester = payload.academicSemester
    
    const isSemesterRegistrationExists =await SemesterRegistration.findOne({academicSemester})

    // check if there any registered semester that is already 'UPCOMING' | 'ONGOING

    const isThereAnyUpcommingOrOngoingSemester = await SemesterRegistration.findOne({
      $or:[{status:'UPCOMING'},{status:'ONGOING'}]
    });

    if(isThereAnyUpcommingOrOngoingSemester){
      throw new AppError(httpStatus.BAD_REQUEST,`This Semester is Already in ${isThereAnyUpcommingOrOngoingSemester.status}`)
    }


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

const updateSemesterRegistrationInToDB = async(id:string,payload:Partial<ISemesterRegistration>) =>{

}



export const SemesterRegistrationService = {
    createSemesterRegistrationInToDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationInToDB
}