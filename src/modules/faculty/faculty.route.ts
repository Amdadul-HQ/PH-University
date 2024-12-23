import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../app/middleware/validateRequest';
import { facultyValidation } from './faculty.validation';
import auth from '../../app/middleware/auth';

const FacultyRouter = express.Router();

// Get all Faculty
FacultyRouter.get('/', auth(), FacultyController.getAllFaculty);

// Get single Faculty
FacultyRouter.get('/:id', FacultyController.getSingleFaculty);

// Update faculty
FacultyRouter.patch(
  '/:id',
  validateRequest(facultyValidation.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

// Delete Faculty
FacultyRouter.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = FacultyRouter;
