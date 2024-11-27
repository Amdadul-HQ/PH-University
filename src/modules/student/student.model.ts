import { Schema, model } from 'mongoose';
import { IStudent } from './student.interface';

// sub sechema
const commonSchema = {
  type: String,
  required: true,
};

// sub sechema

const studentNameSchema = {
  firstName: commonSchema,
  middleName: commonSchema,
  lastName: commonSchema,
};

const guardianSchema = {
  fatherName: commonSchema,
  fatherOccupation: commonSchema,
  fatherContactNo: commonSchema,
  motherName: commonSchema,
  motherOccupation: commonSchema,
  motherContactNo: commonSchema,
};

//sub schema

const localGurdianSchema = {
  name: commonSchema,
  occupation: commonSchema,
  address: commonSchema,
  contactNo: commonSchema,
};

// Schema

const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
  },
  name: {
    type: studentNameSchema,
    required:true
  },
  dateOfBirth: commonSchema,
  email: commonSchema,
  contactNo: commonSchema,
  emergencyContactNo: commonSchema,
  presentAddress: commonSchema,
  permanentAddress: commonSchema,
  localGurdian: localGurdianSchema,
  guardian: guardianSchema,
  profileImg: commonSchema,
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-'],
    required: true,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// Mdel
export const Student = model<IStudent>('Student', studentSchema);
