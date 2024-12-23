import express from 'express';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import validateRequest from '../../app/middleware/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const SemesterRegistrationRouter = express.Router();

SemesterRegistrationRouter.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

SemesterRegistrationRouter.get(
  '/',
  SemesterRegistrationController.getAllSemesterRegistration,
);

SemesterRegistrationRouter.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

SemesterRegistrationRouter.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = SemesterRegistrationRouter;
