import mongoose from 'mongoose';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import { AppError } from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

// Student register
// const createStudentInToDB = async (studentData: IStudent) => {

//   // custome instance method
//   // const student = new Student(studentData);
  
//   // if(await student.isStudentExists(studentData.id)){
//   //   throw new Error("Student Alreay Register")
//   // }
//   // const result = student.save()

//   // build in instance method
//   // const result = await Student.create(studentData);
  
//   if(await Student.isStudentExists(studentData.id)){
//     throw new Error("Staudent Alreay Register!!")
//   }
//   const result = await Student.create(studentData);
//   return result;
// };

// Students gell
const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  return result;
};

// Get singel Student
const getSingleStudentsFromDB = async (studentId: string) => {
  const result = await Student.findOne({ id: studentId });
  return result;
};

// Delete Student From db
const deleteStudentFromDB = async (id:string) =>{
  // if (!(await Student.isStudentExists(id))) {
  //   throw new Error('Staudent Not Found!!');
  // }


  const session = await mongoose.startSession();
  try{
  session.startTransaction();
  
  


  const deletedStudent = await Student.findByIdAndUpdate({id},{isDeleted:true},{new:true,session});

  if(!deletedStudent){
    throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete Stuedent')
  }

  const deleteUser = await User.findByIdAndUpdate({id},{isDeleted:true},{new:true,session})

  if(!deleteUser){
    throw new AppError(httpStatus.BAD_REQUEST,'Faild to delete user')
  }

  await session.commitTransaction();
  await session.endSession()

  return deletedStudent
  }
  catch(error){
    if(error){
      await session.abortTransaction();
      await session.endSession();
    }
  }



}

// Update Student Into DB
const updateStudentIntoDB = async (id:string,updateData:IStudent ) => {
  if(!(await Student.isStudentExists(id))){
    throw new Error('Staudent Not Found!!');
  }
  const result = await Student.updateOne({id},{...updateData});
  return result;
}

export const StudentServices = {
  // createStudentInToDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB
};
