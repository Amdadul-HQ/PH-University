import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../app/middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';


const AcademicSemesterRouter = express.Router();


AcademicSemesterRouter.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);


export const AcademicSemesterRoutes = AcademicSemesterRouter;