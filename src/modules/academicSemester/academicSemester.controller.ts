import httpStatus from 'http-status';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {

  const result = await AcademicSemesterServices.createAcademicSemesterInToDB(
   req.body
  );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester is created Successfully',
    data: result,
  });
});


const getAcademicSemester = catchAsync(async(req,res)=>{
    const result = await AcademicSemesterServices.getAcademicSemesterFromDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Academic Semester data',
      data: result,
    });
})

const getSingleAcademicSemeter = catchAsync(async(req,res)=>{

    const academicSemesterId = req.params.academicSemesterId;

    const result =
      await AcademicSemesterServices.getSingleAcademicSemeterFromDB(
        academicSemesterId,
      );
     sendResponse(res, {
       success: true,
       statusCode: httpStatus.OK,
       message: 'Single Academic Semester data',
       data: result,
     });
})

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemeter
};
