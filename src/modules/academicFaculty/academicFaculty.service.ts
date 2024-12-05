import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model"

const createAcademicFacultyInToDB = async(payload:IAcademicFaculty) =>{
    const result = await AcademicFaculty.create(payload);
    return result;
}

const getAllAcademicFacultyFromDB = async () =>{
    const result = await AcademicFaculty.find();
    return result
}

const getSingleAcademicFacultyFromDB = async (id:string) =>{
    const result = await AcademicFaculty.findById(id);
    return result
}


const updateAcademicFacaultyInToDB = async (id:string,payload:Partial<IAcademicFaculty>) =>{
    const result = await AcademicFaculty.findOneAndUpdate({_id:id},payload,{new:true})
    return result;
}


export const AcademicFacultyServices = {
    createAcademicFacultyInToDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacaultyInToDB
}