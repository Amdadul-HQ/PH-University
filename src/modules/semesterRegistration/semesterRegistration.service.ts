import httpStatus from 'http-status';
import { AppError } from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationInToDB = async (
  payload: ISemesterRegistration,
) => {
  const academicSemester = payload.academicSemester;

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  // check if there any registered semester that is already 'UPCOMING' | 'ONGOING

  const isThereAnyUpcommingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: registrationStatus.UPCOMING },
        { status: registrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcommingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester is Already in ${isThereAnyUpcommingOrOngoingSemester.status}`,
    );
  }

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester is already registered!',
    );
  }

  // chec if the semseter is exist

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester not found!',
    );
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationInToDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  const requestedStatus = payload.status;

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Semester isn not found');
  }

  const currentSemesterStatus = isSemesterRegistrationExists.status;

  //if the requested semester registration is ended, we will not update
  if (currentSemesterStatus === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Semester is alrealy ENDED',
    );
  }

  if (
    currentSemesterStatus === registrationStatus.UPCOMING &&
    requestedStatus === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not directly update to UPCOMING To ENDED',
    );
  }

  if (
    currentSemesterStatus === registrationStatus.ONGOING &&
    requestedStatus === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not directly update to ONGOING To UPCOMING',
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationInToDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInToDB,
};
