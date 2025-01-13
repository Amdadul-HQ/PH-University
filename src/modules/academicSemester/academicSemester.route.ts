import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../app/middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const AcademicSemesterRouter = express.Router();

AcademicSemesterRouter.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

// Get all Academic Semester
AcademicSemesterRouter.get('/', 
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  AcademicSemesterController.getAcademicSemester
);

// Singel Academic Semester
AcademicSemesterRouter.get(
  '/:academicSemesterId',
  AcademicSemesterController.getSingleAcademicSemeter,
);

// Update Academic Semester
AcademicSemesterRouter.patch(
  '/:academicSemesterId',
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = AcademicSemesterRouter;
