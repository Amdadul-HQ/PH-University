import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';

const  catchAsync = (fn:RequestHandler) => {

  return (req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch(err => next(err));
  }
}


// import { studentZodSchema } from './student.validate';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student } = req.body;

//     const zodValidation = studentZodSchema.safeParse(student);
    
//     if(!zodValidation.success){
//         res.status(500).json({
//           success: false,
//           message: 'Something went wrong',
//           error: zodValidation.error.format(),
//         });
//     }
//     // will call service func to send this data
//     const result = await StudentServices.createStudentInToDB(student);

//     // send response
//     res.status(201).json({
//       success: true,
//       message: 'Student is created succesfully',
//       data: result,
//     });
//   } catch (error:any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong',
//       // error: error,
//     });
//   }
// };

// Get All student
const getAllStudent = catchAsync(async (req, res,next) => {

    const result = await StudentServices.getAllStudentsFromDB();

    // send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Student data',
      data: result,
    });
});

// Get Singel Student
const getSingelStudent = catchAsync( async (req, res,next) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
     sendResponse(res, {
       success: true,
       statusCode: httpStatus.OK,
       message: 'single Student data',
       data: result,
     });

})

const deleteSingelStudent = catchAsync(async (req, res,next) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'single Student data deleted',
      data: result,
    });
    
});

// Update Student Information
const updateSingleStudent = catchAsync(async (req, res,next) => {
    const { studentId } = req.params;
    const {student} = req.body;

    const result = await StudentServices.updateStudentIntoDB(studentId,student)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student data Updated',
      data: result,
    });
})

export const StudentControllers = {
  // createStudent,
  getAllStudent,
  getSingelStudent,
  deleteSingelStudent,
  updateSingleStudent
};
