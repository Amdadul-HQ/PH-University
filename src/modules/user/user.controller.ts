import { Request, Response } from "express";
import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password,student } = req.body;

    // const zodValidation = studentZodSchema.safeParse(student);

    // if (!zodValidation.success) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: zodValidation.error.format(),
    //   });
    // }
    // will call service func to send this data
    const result = await UserService.createStudentInToDB(password,student);

    // send response
    res.status(201).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      // error: error,
    });
  }
};


export const UserController = {
    createStudent
}
