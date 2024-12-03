import config from "../../app/config";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createStudentInToDB = async (password:string,studentData: IStudent) => {
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

    const userData : Partial<IUser> = {};
    userData.password = password || (config.default_pass as string);
    // if(!password){
    //     user.password=config.default_pass as string ;
    // }
    // else{
    //     user.password = password
    // }
    userData.role = 'student';


    // manulally generate id
    userData.id = '2030040001';

    // 

    const newUser = await User.create(userData);

    // create a student
    if(Object.keys(newUser).length){
        // set id,_id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id; //reference _id
    }

    const newStudent = await Student.create(studentData)
    return newStudent
};

export const UserService = {
    createStudentInToDB
}