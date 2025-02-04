import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { studentZodSchema } from '../student/student.validate';
import validateRequest from '../../app/middleware/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validate';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validate';
import { upload } from '../../app/utils/sendImageTOCloudinary';

const UserRoute = express.Router();

// Create stuent
UserRoute.post(
  '/create-student',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data);
    next()
  },
  validateRequest(studentZodSchema.createStudentValidationSchema),
  UserController.createStudent,
);

// Create Faculty
UserRoute.post(
  '/create-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.body);
    next();
  },
  validateRequest(facultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

// Create Admin
UserRoute.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

UserRoute.get('/', UserController.getAllUser);

UserRoute.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student,USER_ROLE.superAdmin),
  UserController.getMe,
);

UserRoute.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRoutes = UserRoute;
