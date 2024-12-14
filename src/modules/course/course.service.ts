import { ICourse } from "./course.interface";
import { Course } from "./course.model"

const createCourseInToDB = async(payload:ICourse) =>{
    const result = await Course.create(payload);
    return result;
};

const getAllCoursesFromDB = async () =>{
    const result = await Course.find();
    return result
}

const getSingleCourseFromDB = async (id:string) =>{
    const result = await Course.findById(id);
    return result;
}

const updateCourseInToDB = async (id:string,payload:Partial<ICourse>) =>{

}

const deleteCourseFromDB = async (id:string) =>{
    const result = await Course.findByIdAndUpdate(id,{isDeleted:true},{new:true});

    return result;
}




export const CourseServices = {
    createCourseInToDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseInToDB,
    deleteCourseFromDB
}