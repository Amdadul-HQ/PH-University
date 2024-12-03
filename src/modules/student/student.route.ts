import express from 'express';
import { StudentControllers } from './student.controller';

const StudentRouter = express.Router();

// Student Create
// StudentRouter.post('/create-student', StudentControllers.createStudent);

// Get All Students
StudentRouter.get('/get-all-students', StudentControllers.getAllStudent);

// Get Single Students
StudentRouter.get('/:studentId', StudentControllers.getSingelStudent);

// Delet Students
StudentRouter.delete('/:studentId',StudentControllers.deleteSingelStudent)

// Update Students
StudentRouter.patch('/:studentId',StudentControllers.updateSingleStudent)

export const StudentRouters = StudentRouter;
