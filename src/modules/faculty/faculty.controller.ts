import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { FacultyService } from "./faculty.service";

const getAllFaculty = catchAsync(async(req,res)=>{
    console.log(req.user);
    const result = await FacultyService.getAllFacultyFromDB(req.query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Faculties All Data',
        data:result
    })
})


const getSingleFaculty = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await FacultyService.getSingleFacultyFromDB(id);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Single Faculty Data',
        data:result
    })
})


const updateFaculty = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const {faculty} = req.body;
    const result = await FacultyService.updateFacultyInToDB(id,faculty);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Faculty Data is Updated',
        data:result
    })
})


const deleteFaculty = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await FacultyService.deleteFacultyFromDB(id);

     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Faculty Data is deleted',
       data: result,
     });
})


export const FacultyController = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}