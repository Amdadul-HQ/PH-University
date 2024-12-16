import httpStatus from "http-status";
import { AppError } from "../../app/errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseInToDB = async(payload:IOfferedCourse)=>{
    const {semesterRegistration,academicFaculty,academicDepartment,course,faculty,section,days,startTime,endTime} = payload;


    const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration)

    if(!isSemesterRegistrationExits){
        throw new AppError(httpStatus.NOT_FOUND,"Semester Registration not found!")
    }

    const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty);
    
    if(!isAcademicFacultyExits){
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Academic Faculty not found!',
        );
    }

    const isAcademicDepartment = await AcademicDepartment.findById(academicDepartment);

    if(!isAcademicDepartment){
        throw new AppError(httpStatus.NOT_FOUND,'Academic Department is not found!!')
    }

    const isCourseExists = await Course.findById(course);
    if(!isCourseExists){
        throw new AppError(httpStatus.NOT_FOUND,'Course is not found!!')
    }

    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!!');
    }

    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
      _id:academicDepartment,
      academicFaculty,
    });

    if(!isDepartmentBelongToFaculty){
        throw new AppError(httpStatus.NOT_FOUND,`This ${isAcademicDepartment.name} is not belong to this ${isAcademicFacultyExits.name}`)
    }

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })

    if(isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection){
        throw new AppError(httpStatus.BAD_REQUEST,`Offered course with same section is already exist!`)
    }

    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days:{$in:days }
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime
    };

    // assignedSchedules.forEach((schedule)=>{
    //     const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    //     const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    //     const newStartingTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    //     const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    //     if(newStartingTime<existingEndTime && newEndTime > existingStartTime){
    //         throw new AppError(httpStatus.CONFLICT,'This Faculty is not available at that time !')
    //     }
    // })

    if(hasTimeConflict(assignedSchedules,newSchedule)){
        throw new AppError(
          httpStatus.CONFLICT,
          'This Faculty is not available at that time !',
        );
    }
    


    const academicSemester = isSemesterRegistrationExits.academicSemester


    const result = await OfferedCourse.create({...payload, academicSemester})
    return result;
}


export const OfferedCourseServices = {
    createOfferedCourseInToDB
}