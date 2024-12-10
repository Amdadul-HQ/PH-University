import express from "express";
import { FacultyController } from "./faculty.controller";

const FacultyRouter = express.Router();

FacultyRouter.get('/',FacultyController.getAllFaculty);

export const FacultyRoutes = FacultyRouter;


