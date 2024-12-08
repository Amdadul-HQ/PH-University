import express from 'express';
import { UserController } from './user.controller';
import { studentZodSchema } from '../student/student.validate';
import validateRequest from '../../app/middleware/validateRequest';

const UserRoute = express.Router();

UserRoute.post(
  '/create-student',
  validateRequest(studentZodSchema.createStudentValidationSchema),
  UserController.createStudent,
);

UserRoute.get('/',UserController.getAllUser)

export const UserRoutes = UserRoute;
