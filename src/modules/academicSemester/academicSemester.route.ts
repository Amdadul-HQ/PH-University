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

// Get all Academic Semester
AcademicSemesterRouter.get('/',AcademicSemesterController.getAcademicSemester);

// Singel Academic Semester
AcademicSemesterRouter.get('/:academicSemesterId',AcademicSemesterController.getSingleAcademicSemeter)

// Update Academic Semester
AcademicSemesterRouter.patch('/:academicSemesterId',AcademicSemesterController.updateAcademicSemester);

export const AcademicSemesterRoutes = AcademicSemesterRouter;