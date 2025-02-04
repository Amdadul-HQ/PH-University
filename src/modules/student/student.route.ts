import express from 'express';
import { StudentControllers } from './student.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const StudentRouter = express.Router();

// Student Create
// StudentRouter.post('/create-student', StudentControllers.createStudent);

// Get All Students
StudentRouter.get(
  '/get-all-students',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  StudentControllers.getAllStudent,
);

// Get Single Students
StudentRouter.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  StudentControllers.getSingelStudent,
);

// Delet Students
StudentRouter.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin), StudentControllers.deleteSingelStudent);

// Update Students
StudentRouter.patch('/:id', StudentControllers.updateSingleStudent);

export const StudentRouters = StudentRouter;
