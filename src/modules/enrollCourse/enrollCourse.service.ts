import { IEnrolledCourse } from "./enrollCourse.interface";

const createEnrolledCourseIntoDB = (id:string,payload:IEnrolledCourse) =>{

}

const updateEnrolledCourseMarksIntoDB = (id:string,payload:Partial<IEnrolledCourse>) =>{

}

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB
}