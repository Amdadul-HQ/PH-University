import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { IEnrolledCourse } from "./enrollCourse.interface";
import EnrolledCourse from "./enrollCourse.model";
import { Student } from "../student/student.model";

const createEnrolledCourseIntoDB = async (id:string,payload:IEnrolledCourse) =>{
    const {offeredCourse} = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

    const student = await Student.findOne({id}).select('id')

    if(!student){
        throw new AppError(httpStatus.NOT_FOUND,"Student Not Found")
    }
    
    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND,"Foofered Course not found")
    }
    
    if(isOfferedCourseExists?.maxCapacity<=0){
        throw new AppError(httpStatus.BAD_GATEWAY,"Room is Full")
    };

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration:isOfferedCourseExists?.semesterRegistration,
        offeredCourse,
        student:student?.id
    })

    if(isStudentAlreadyEnrolled){
        throw new AppError(httpStatus.CONFLICT,"Student Is Already Enrolled!")
    };

    

    const result = await EnrolledCourse.create({
        semesterRegistration:isOfferedCourseExists.semesterRegistration,
        academicDepartment:isOfferedCourseExists.academicDepartment,
        academicFaculty:isOfferedCourseExists.academicFaculty,
        academicSemester:isOfferedCourseExists.academicSemester,
        course:isOfferedCourseExists.course,
        student:student._id,
        faculty:isOfferedCourseExists.faculty,
        offeredCourse,
    })

    return result;
    
}

const updateEnrolledCourseMarksIntoDB = (id:string,payload:Partial<IEnrolledCourse>) =>{

}

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB
}