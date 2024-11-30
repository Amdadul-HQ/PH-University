import { IStudent } from './student.interface';
import { Student } from './student.model';

// Student register
const createStudentInToDB = async (studentData: IStudent) => {
  // built in static method
  const result = await Student.create(studentData);

  // Static method
  if (await Student.isStudentExists(studentData.id)){
    throw new Error('Student already exists!');
  }
    // create an instance
    // const student = new Student(studentData);

    // st

    // checking Student Exists
    // if (await student.isStudentExists(studentData.id)){
    //   throw new Error("Student already exists")
    // }

    // const result = await student.save()
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
