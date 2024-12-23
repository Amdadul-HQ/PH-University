import express from 'express';
import { UserController } from './user.controller';
import { studentZodSchema } from '../student/student.validate';
import validateRequest from '../../app/middleware/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validate';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validate';

const UserRoute = express.Router();

// Create stuent
UserRoute.post(
  '/create-student',
  validateRequest(studentZodSchema.createStudentValidationSchema),
  UserController.createStudent,
);

// Create Faculty
UserRoute.post(
  '/create-faculty',
  validateRequest(facultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

// Create Admin
UserRoute.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

UserRoute.get('/', UserController.getAllUser);

UserRoute.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
);

UserRoute.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRoutes = UserRoute;
