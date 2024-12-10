import express from "express";
import { FacultyController } from "./faculty.controller";
import validateRequest from "../../app/middleware/validateRequest";
import { facultyValidation } from "./faculty.validation";

const FacultyRouter = express.Router();

// Get all Faculty
FacultyRouter.get('/',FacultyController.getAllFaculty);

// Get single Faculty
FacultyRouter.get('/:id',FacultyController.getSingleFaculty);

// Update faculty
FacultyRouter.patch('/:id',validateRequest(facultyValidation.updateFacultyValidationSchema),
    FacultyController.updateFaculty
)

// Delete Faculty
FacultyRouter.delete('/:id',FacultyController)

export const FacultyRoutes = FacultyRouter;


