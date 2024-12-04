import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentZodSchema } from '../student/student.validate';

const UserRoute = express.Router();

const validateRequest = (schema : AnyZodObject)=>{
 return async (req: Request, res: Response, next: NextFunction) => {
   // validation
   try{
    console.log('checking validation ');
    await schema.parseAsync({ body: req.body });
    next();
   }
   catch(err){
    next(err)
   }
 }
}

UserRoute.post('/create-student',validateRequest(studentZodSchema.studentValidationSchema),UserController.createStudent)


export const UserRoutes = UserRoute