import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation
    try {
      console.log('checking validation ');
      await schema.parseAsync({ body: req.body });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;