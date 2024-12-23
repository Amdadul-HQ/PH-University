import httpStatus from 'http-status';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.createSemesterRegistrationInToDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration All Data successfully Loaded',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration Single Data successfully Loaded',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result =
    await SemesterRegistrationService.updateSemesterRegistrationInToDB(
      id,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration is updated successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
