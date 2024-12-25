import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { EnrolledCourseValidations } from './enrollCourse.validation';
import { EnrolledCourseControllers } from './enrollCourse.controller';

const EnrollCourseRoute = express.Router();

EnrollCourseRoute.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

EnrollCourseRoute.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = EnrollCourseRoute;
