import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../app/middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const AcademicDepartmentRouter = express.Router();


AcademicDepartmentRouter.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
);


AcademicDepartmentRouter.get(
    '/',AcademicDepartmentControllers.getAllAcademicDepartment
);


AcademicDepartmentRouter.get('/:departmentId',AcademicDepartmentControllers.getSingleAcademicDepartment);

AcademicDepartmentRouter.patch(
    '/:departmentId',validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.updateAcademicDepartment
);


export const AcademicDepartmentRoutes = AcademicDepartmentRouter;