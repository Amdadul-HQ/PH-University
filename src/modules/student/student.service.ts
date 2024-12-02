import { IStudent } from './student.interface';
import { Student } from './student.model';

// Student register
const createStudentInToDB = async (studentData: IStudent) => {

  // custome instance method
  // const student = new Student(studentData);
  
  // if(await student.isStudentExists(studentData.id)){
  //   throw new Error("Student Alreay Register")
  // }
  // const result = student.save()

  // build in instance method
  // const result = await Student.create(studentData);
  
  if(await Student.isStudentExists(studentData.id)){
    throw new Error("Staudent Alreay Register!!")
  }
  const result = await Student.create(studentData);
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

// Delete Student From db
const deleteStudentFromDB = async (id:string) =>{
  if (!(await Student.isStudentExists(id))) {
    throw new Error('Staudent Not Found!!');
  }
  const result = await Student.updateOne({id},{isDeleted:true});
  return result
}

export const StudentServices = {
  createStudentInToDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
};
