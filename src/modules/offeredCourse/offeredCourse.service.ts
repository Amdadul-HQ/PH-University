import { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseInToDB = async(payload:IOfferedCourse)=>{
    const result = await OfferedCourse.
}


export const OfferedCourseServices = {
    createOfferedCourseInToDB
}