import { User } from "./user.model";

const createStudentInToDB = async (studentData: IStudent) => {
  // custome instance method
  // const student = new Student(studentData);

  // if(await student.isStudentExists(studentData.id)){
  //   throw new Error("Student Alreay Register")
  // }
  // const result = student.save()

  // build in instance method
  // const result = await Student.create(studentData);

//   if (await Student.isStudentExists(studentData.id)) {
//     throw new Error('Staudent Alreay Register!!');
//   }
//   const result = await Student.create(studentData);
    const result = await User.create(studentData)

  return result;
};

export const UserService = {
    createStudentInToDB
}