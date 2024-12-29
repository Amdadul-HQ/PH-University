import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const AcademicFacultyRouter = express.Router();

// careate Academic Faculty
AcademicFacultyRouter.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin),
  validateRequest(
    AcademicFacultyValidation.createdAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

// get Academic Faculty All
AcademicFacultyRouter.get(
  '/',
  AcademicFacultyControllers.getAllAcademicFaculty,
);

// get Academic Faculty single
AcademicFacultyRouter.get(
  '/:id',
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

// update Academic Faculty
AcademicFacultyRouter.patch(
  '/:id',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFacaulty,
);

export const AcademicFacultyRoutes = AcademicFacultyRouter;
