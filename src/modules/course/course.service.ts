import mongoose from 'mongoose';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { ICourse, ICourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../app/errors/AppError';
import httpStatus from 'http-status';

const createCourseInToDB = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course',
  );
  return result;
};

const updateCourseInToDB = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // step -1 basic course info

    const updateBasicCourseInFo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInFo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
    }

    // check if there is any preRequisiteCoures to update;
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      // filter out thek delete fields
      const deletedPreRequisites = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisites } },
          },
        },
        { session, new: true, runValidators: true },
      );

      if (!deletedPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Course');
      }

      const addedPreRequisites = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const addedPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: addedPreRequisites } },
        },
        { session },
      );

      if (!addedPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Course');
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    );

    session.commitTransaction();
    session.endSession();

    return result;
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session.abortTransaction();
    session.endSession();
    throw new Error(err || 'Faild to update Course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

const assignCourseToFacultyInToDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultyFromCourseFromDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseInToDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseInToDB,
  deleteCourseFromDB,
  assignCourseToFacultyInToDB,
  removeFacultyFromCourseFromDB,
};
