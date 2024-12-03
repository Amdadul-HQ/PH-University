import express from 'express';
import { UserController } from './user.controller';

const UserRoute = express.Router();

UserRoute.post('/create-student',UserController.createStudent)


export const UserRoutes = UserRoute