import config from "../../app/config";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

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

// if(!password){
    //     user.password=config.default_pass as string ;
    // }
    // else{
        //     user.password = password
        // }
    const userData : Partial<IUser> = {};
    userData.password = password || (config.default_pass as string);

    

    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester)

    
    
    userData.role = 'student';
    // manulally generate id
    userData.id = generateStudentId(admissionSemester as IAcademicSemester);

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