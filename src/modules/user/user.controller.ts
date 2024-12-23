import httpStatus from "http-status";
import { UserService } from "./user.service";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";






const createStudent = catchAsync(async (req, res) => {
  // const zodValidation = studentZodSchema.safeParse(student);
  
  // if (!zodValidation.success) {
    //   res.status(500).json({
      //     success: false,
      //     message: 'Something went wrong',
      //     error: zodValidation.error.format(),
      //   });
      // }
      // will call service func to send this data
  
  const { password,student } = req.body;
  const result = await UserService.createStudentInToDB(password,student);

    // send response
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Student is created Successfully",
        data:result
    })
})

// Create Faculty
const createFaculty = catchAsync(async (req,res)=>{
  const {password,faculty:facultyData} = req.body;
  console.log(password,facultyData);

  const result = await UserService.createFacultyInToDB(password,facultyData);
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:'Faculty is Created succesfully',
    data:result
  })
})

// Create Admin
const createAdmin = catchAsync(async(req,res)=>{
  const {password,admin:adminData} = req.body;

  const result = await UserService.createAdminInToDB(password,adminData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin is Created succesfully',
    data: result,
  });
})



const getAllUser = catchAsync(async(req,res)=>{
  const result = await UserService.getAllUserFromDB();
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"All Users",
    data:result
  })
})


const getMe = catchAsync(async(req,res)=>{

  const {userId,role} = req.user as JwtPayload

  const result = await UserService.getMeFromDB(userId,role)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Data is retrieved successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async(req,res)=>{
  const {id} = req.params;

  const result = await UserService.changeStatusInToDB(id,req.body)

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Status is updated successfully',
    data:result
  })
})

export const UserController = {
    createStudent,
    getAllUser,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus
}
