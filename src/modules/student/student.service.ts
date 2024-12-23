/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import { AppError } from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { studentSearchAbleFields } from './student.constant';

// Student register
// const createStudentInToDB = async (studentData: IStudent) => {

//   // custome instance method
//   // const student = new Student(studentData);

//   // if(await student.isStudentExists(studentData.id)){
//   //   throw new Error("Student Alreay Register")
//   // }
//   // const result = student.save()

//   // build in instance method
//   // const result = await Student.create(studentData);

//   if(await Student.isStudentExists(studentData.id)){
//     throw new Error("Staudent Alreay Register!!")
//   }
//   const result = await Student.create(studentData);
//   return result;
// };

// Students gell
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = {...query}

  // let searchTerm = ''

  // const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];

  // if(query?.searchTearm){
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach(field => delete queryObj[field])

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';

  // if(query.sort){
  //   sort = query?.sort as string
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 1;

  // if(query.limit){
  //   limit = Number(query.limit)
  // }

  // if(query.page){
  //   page = Number(query.page)
  //   skip = (page-1)*limit
  // }

  // const paginateQuery = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit)

  // // fields limiting
  // let fields ='-__v';
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldsQuery = await limitQuery.select(fields)

  // return fieldsQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  );

  studentQuery
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;

  return result;
};

// Get singel Student
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// Delete Student From db
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isStudentExists = await Student.isStudentExists(id);

    if (isStudentExists == null) {
      throw new AppError(httpStatus.NOT_FOUND, 'Staudent Not Found!!');
    }

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Stuedent');
    }

    const userId = deletedStudent.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error: any) {
    if (error) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(httpStatus.BAD_GATEWAY, `${error.message}`);
    }
  }
};

// Update Student Into DB
const updateStudentIntoDB = async (
  id: string,
  updateData: Partial<IStudent>,
) => {
  if (!(await Student.isStudentExists(id))) {
    throw new Error('Staudent Not Found!!');
  }

  const { name, guardian, localGurdian, ...remaingStuentData } = updateData;

  //

  const modifiedUpdateData: Record<string, unknown> = {
    ...remaingStuentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdateData[`localGurdian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
