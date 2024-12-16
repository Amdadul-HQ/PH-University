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

OfferedCourseRouter.patch('/:id',validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),OfferedCourseControllers.updateOfferedCourse)

export const OfferedCourseRoutes = OfferedCourseRouter;