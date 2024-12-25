import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { IEnrolledCourse } from "./enrollCourse.interface";
import EnrolledCourse from "./enrollCourse.model";
import { Student } from "../student/student.model";
import mongoose from "mongoose";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { calculateGradeAndPoints } from "./enrollCourse.utils";

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
    
    const course = await Course.findById(isOfferedCourseExists.course);
    
    const currentCredits = course?.credits
    
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

    if(totalCredits && semesterRegistration?.maxCredit && totalCredits + currentCredits > semesterRegistration?.maxCredit ){
        throw new AppError(httpStatus.BAD_GATEWAY,"You have exceeded maxium number of credits!")
    }

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

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<IEnrolledCourse>,
) => {

    const {semesterRegistration,offeredCourse,student,courseMarks} = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND,"Offered course not found!")
    }

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);

    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND,"Semester Registration not found")
    }

    const isStudentExists = await Student.findById(student);

    if(!isStudentExists){
        throw new AppError(httpStatus.NOT_FOUND,"Student not found!");
    }

    const faculty = await Faculty.findOne({id:facultyId}).select("_id")

    if(!faculty){
        throw  new AppError(httpStatus.NOT_FOUND,"Faculty not Found!")
    }

    const isCourseBelongToFaculty = await EnrolledCourse.findOne({semesterRegistration,offeredCourse,student,faculty:faculty?._id});

    if(!isCourseBelongToFaculty){
        throw new AppError(httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS,'You can you update this student!')
    }

    const modifiedData: Record<string,unknown> ={
        ...courseMarks
    };

      if (courseMarks?.finalTerm) {
        const { classTest1, classTest2, midTerm, finalTerm } =
          isCourseBelongToFaculty.courseMarks;

        const totalMarks =
          Math.ceil(classTest1 * 0.1) +
          Math.ceil(midTerm * 0.3) +
          Math.ceil(classTest2 * 0.1) +
          Math.ceil(finalTerm * 0.5);

        const result = calculateGradeAndPoints(totalMarks);

        modifiedData.grade = result.grade;
        modifiedData.gradePoints = result.gradePoints;
        modifiedData.isCompleted = true;
      }

      if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
          modifiedData[`courseMarks.${key}`] = value;
        }
      }


    const result  = await EnrolledCourse.findByIdAndUpdate(isCourseBelongToFaculty._id,modifiedData,{new:true});

    return result;
    
};

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB
}