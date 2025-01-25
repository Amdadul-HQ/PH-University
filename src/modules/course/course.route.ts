import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { CourseValidation } from './course.validate';
import { CourseController } from './course.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../app/middleware/auth';

const CourseRouter = express.Router();

CourseRouter.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

CourseRouter.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getFacultiesWithCourse,
);

CourseRouter.get('/', CourseController.getAllCourses);

CourseRouter.get('/:id', CourseController.getSingleCourse);

CourseRouter.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourses,
);

CourseRouter.delete('/:id', CourseController.deleteCourse);

CourseRouter.put(
  '/:id/assign-faculties',
  validateRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.assignCourseToFaculty,
);

CourseRouter.delete(
  '/:id/assign-faculties',
  validateRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.removeFacultyFromCourse,
);

export const CourseRouters = CourseRouter;
