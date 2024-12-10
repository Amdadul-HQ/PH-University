import express from 'express';
import { UserController } from './user.controller';
import { studentZodSchema } from '../student/student.validate';
import validateRequest from '../../app/middleware/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validate';

const UserRoute = express.Router();

// Create stuent
UserRoute.post(
  '/create-student',
  validateRequest(studentZodSchema.createStudentValidationSchema),
  UserController.createStudent,
);

// Create Faculty 
UserRoute.post('/create-faculty',validateRequest(facultyValidation.createFacultyValidationSchema),
UserController.createFaculty
);

// Create Admin
UserRoute.post('/create-admin',validateRequest(AdminValidations.createAdminValidationSchema),
UserController.createAdmin
);

UserRoute.get('/',UserController.getAllUser)



export const UserRoutes = UserRoute;
