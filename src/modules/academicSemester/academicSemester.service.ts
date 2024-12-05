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
const getSingleAcademicSemeterFromDB = async(id:string)=>{

    const result = await AcademicSemester.findOne({_id:id});
    return result
}

// Update Academic Semester 
const updateAcademicSemesterInToDB = async(id:string,payload: Partial<IAcademicSemester>) =>{
    
    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error("Invalid Semester code")
    }

    const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true})

    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterInToDB,
    getAcademicSemesterFromDB,
    getSingleAcademicSemeterFromDB,
    updateAcademicSemesterInToDB
}