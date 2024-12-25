import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { IEnrolledCourse } from "./enrollCourse.interface";
import EnrolledCourse from "./enrollCourse.model";
import { Student } from "../student/student.model";
import mongoose from "mongoose";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";

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

    const semesterRegistration = await SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select("maxCredit");

    const enrolledCourse = await EnrolledCourse.aggregate([
      {
        $match: {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          student: student._id,
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'enrolledCourseData',
        },
      },
      {
        $unwind: '$enrolledCourseData',
      },
      {
        $group: {
          _id: null,
          totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
        },
      },
      {
        $project: {
          _id: 0,
          totalEnrolledCredits:1
        },
      },
    ]); 

    const totalCredits = enrolledCourse.length>0 ? enrolledCourse[0].totalEnrolledCredits : 0

    

    const session = await mongoose.startSession();
    try{
        session.startTransaction()
        const result = await EnrolledCourse.create(
          [
            {
              semesterRegistration: isOfferedCourseExists.semesterRegistration,
              academicDepartment: isOfferedCourseExists.academicDepartment,
              academicFaculty: isOfferedCourseExists.academicFaculty,
              academicSemester: isOfferedCourseExists.academicSemester,
              course: isOfferedCourseExists.course,
              student: student._id,
              faculty: isOfferedCourseExists.faculty,
              isEnrolled:true,
              offeredCourse,
            },
        ],
        { session },
    );
    
        if(!result){
            throw new AppError(httpStatus.BAD_REQUEST,'Failed to enroll in this course')
        }
        const maxCapacity = isOfferedCourseExists.maxCapacity;
    
        await OfferedCourse.findByIdAndUpdate(offeredCourse,{maxCapacity:maxCapacity-1})
        await session.commitTransaction();
        await session.endSession();
        return result;

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(errors:any){
        await session.abortTransaction();
        await session.endSession();
        throw new Error(errors);
    }

    


}

const updateEnrolledCourseMarksIntoDB = (id:string,payload:Partial<IEnrolledCourse>) =>{

}

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB
}