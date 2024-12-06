import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async(req,res)=>{
    const result = await AcademicDepartmentServices.createAcademicDepartmentInToDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic Department is created Successfull',
        data:result
    })
})

const getAllAcademicDepartment = catchAsync(async(req,res)=>{
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic Department all data',
        data:result
    })
});


const getSingleAcademicDepartment = catchAsync(async(req,res)=>{
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(req.params.departmentId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic Department single data',
        data:result
    })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentInToDB(
      req.params.departmentId,req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department single data updated successfully',
    data: result,
  });
});


export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}