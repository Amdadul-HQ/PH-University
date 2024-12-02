import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentZodSchema } from './student.validate';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    const zodValidation = studentZodSchema.safeParse(student);
    
    if(!zodValidation.success){
        res.status(500).json({
          success: false,
          message: 'Something went wrong',
          error: zodValidation.error.format(),
        });
    }
    // will call service func to send this data
    const result = await StudentServices.createStudentInToDB(student);

    // send response
    res.status(201).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      // error: error,
    });
  }
};

// Get All student
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    // send response
    res.status(200).json({
      success: true,
      message: 'All Students Data',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      // error: error,
    });
  }
};

// Get Singel Student
const getSingelStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentsFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'single Student data',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      // error: error,
    });
  }
};

const deleteSingelStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student data deleted',
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

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingelStudent,
  deleteSingelStudent,
};
