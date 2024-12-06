import { IAcadaemicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentInToDB = async(payload:IAcadaemicDepartment) =>{
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getAllAcademicDepartmentFromDB = async () =>{
    const result = await AcademicDepartment.find();
    return result; 
}

const getSingleAcademicDepartmentFromDB = async(id:string) =>{
    const result = await AcademicDepartment.findById(id);
    return result;
}

const updateAcademicDepartmentInToDB = async(id:string,payload:Partial<IAcadaemicDepartment>) =>{
    const result = await AcademicDepartment.findByIdAndUpdate({_id:id},payload,{
        new:true
    });
    return result
}


export const AcademicDepartmentServices = {
    createAcademicDepartmentInToDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentInToDB
}