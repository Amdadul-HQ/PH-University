import { IStudent } from './student.interface';
import { Student } from './student.model';

// Student register
const createStudentInToDB = async (student: IStudent) => {
  const result = await Student.create(student); 
  return result;
};

// Students gell
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// Get singel Student
const getSingleStudentsFromDB = async (studentId: string) => {
  const result = await Student.findOne({ id: studentId });
  return result;
};

export const StudentServices = {
  createStudentInToDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
};
