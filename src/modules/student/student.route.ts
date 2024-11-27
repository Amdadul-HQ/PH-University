import express from "express";
import { StudentControllers } from "./student.controller";

const StudentRouter = express.Router();






StudentRouter.post('/create-student',StudentControllers.createStudent)

export const StudentRouters = StudentRouter