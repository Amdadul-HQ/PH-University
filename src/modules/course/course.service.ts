import QueryBuilder from "../../app/builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { ICourse } from "./course.interface";
import { Course } from "./course.model"

const createCourseInToDB = async(payload:ICourse) =>{
    const result = await Course.create(payload);
    return result;
};

const getAllCoursesFromDB = async (query:Record<string,unknown>) =>{

    const courseQuery = new QueryBuilder(
      Course.find().populate('preRequisiteCourse.course'),
      query,
    )
      .search(CourseSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await courseQuery.modelQuery;
    return result
}

const getSingleCourseFromDB = async (id:string) =>{
    const result = await Course.findById(id).populate('preRequisiteCourse.course');
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