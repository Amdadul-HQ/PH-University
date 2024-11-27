import { Schema,model,connect } from "mongoose";
import { IStudent } from "./student.interface";



const studentNameSchema = {
  firstName: {
    type:String,
    required:true
},
  middleName: {
    type:String,
    required:true
},
  lastName: {
    type:String,
    required:true
},
};

const guardianSchema ={
    fatherName:{
    type:String,
    required:true
},
    fatherOccupation:{
    type:String,
    required:true
},
    fatherContactNo:{
    type:String,
    required:true
},
    motherName:{
    type:String,
    required:true
},
    motherOccupation:{
    type:String,
    required:true
},
    motherContactNo:{
    type:String,
    required:true
},
}

const localGurdianSchema = {
    name:{
        type:String,
        required:true,
    },
    occupation:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true,
    }
  }



const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
  },
  name: {
    type: studentNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-'],
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  localGurdian: {
    type: localGurdianSchema,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required:true
  },
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// Mdel
export const Student = model<IStudent>('Student', studentSchema);