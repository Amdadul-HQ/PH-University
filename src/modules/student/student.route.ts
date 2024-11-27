import express from "express";
import { StudentControllers } from "./student.controller";

const StudentRouter = express.Router();

// Student Create
StudentRouter.post('/create-student',StudentControllers.createStudent)

StudentRouter.get('/get-all-students',StudentControllers.getAllStudent)

export const StudentRouters = StudentRouter