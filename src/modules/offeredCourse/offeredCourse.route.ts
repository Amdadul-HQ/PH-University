import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
const OfferedCourseRouter = express.Router();

OfferedCourseRouter.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);


export const OfferedCourseRoutes = OfferedCourseRouter;