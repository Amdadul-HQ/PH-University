import mongoose from 'mongoose';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { AppError } from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

const updateFacultyInToDB = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...remaningFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remaningFacultyData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete Faculty');
    }

    const userId = deletedFaculty.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyService = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyInToDB,
  deleteFacultyFromDB,
};
