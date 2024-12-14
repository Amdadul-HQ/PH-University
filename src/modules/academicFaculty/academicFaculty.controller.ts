import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req,res)=>{
    const result = await AcademicFacultyServices.createAcademicFacultyInToDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic Faculty is created successfully',
        data:result
    });
})

const getAllAcademicFaculty = catchAsync(async(req,res)=>{
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Faculty data fetch successfully',
      data: result,
    });
})

const getSingleAcademicFaculty = catchAsync(async(req,res)=>{
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Academic Faculty data fetch successfully',
      data: result,
    });
});

const updateAcademicFacaulty =catchAsync(async(req,res)=>{
    const result = await AcademicFacultyServices.updateAcademicFacaultyInToDB(
    req.params.id,
    req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Updated successfully',
      data: result,
    });
});


export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFacaulty
}