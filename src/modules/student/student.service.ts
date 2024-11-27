import { IStudent } from "./student.interface";
import { Student } from "./student.model";


// Student register
const createStudentInToDB =async (student:IStudent) =>{
    const result = await Student.create(student);
    return result
}



export const StudentServices = {
    createStudentInToDB
}