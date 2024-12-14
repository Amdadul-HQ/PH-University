import express from 'express';
import { StudentControllers } from './student.controller';

const StudentRouter = express.Router();

// Student Create
// StudentRouter.post('/create-student', StudentControllers.createStudent);

// Get All Students
StudentRouter.get('/get-all-students', StudentControllers.getAllStudent);

// Get Single Students
StudentRouter.get('/:id', StudentControllers.getSingelStudent);

// Delet Students
StudentRouter.delete('/:id',StudentControllers.deleteSingelStudent)

// Update Students
StudentRouter.patch('/:id',StudentControllers.updateSingleStudent)

export const StudentRouters = StudentRouter;
