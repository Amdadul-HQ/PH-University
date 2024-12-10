import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { FacultyService } from "./faculty.service";

const getAllFaculty = catchAsync(async(req,res)=>{

    const result = await FacultyService.getAllFacultyFromDB(req.query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Faculties All Data',
        data:result
    })
})



export const FacultyController = {
    getAllFaculty
}