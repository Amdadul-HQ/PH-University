import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { CourseValidation } from './course.validate';
import { CourseController } from './course.controller';


const CourseRouter = express.Router();

CourseRouter.post('/create-course',validateRequest(CourseValidation.createCourseValidationSchema),CourseController.createCourse);


CourseRouter.get('/',CourseController.getAllCourses)

CourseRouter.get('/:id',CourseController.getSingleCourse)

CourseRouter.delete('/:id',CourseController.deleteCourse);

export const CourseRouters = CourseRouter;