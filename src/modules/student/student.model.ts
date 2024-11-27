import { Schema, model } from 'mongoose';
import { IGuardian, ILocalGuardian, IStudent, IStudentName } from './student.interface';


// sub sechema

const studentNameSchema = new Schema<IStudentName>(
{
  firstName: {
  type: String,
  required: true,
},
  middleName: {
  type: String,
  required: true,
},
  lastName: {
  type: String,
  required: true,
},
})

const guardianSchema = new Schema<IGuardian>({
  fatherName: {
  type: String,
  required: true,
},
  fatherOccupation: {
  type: String,
  required: true,
},
  fatherContactNo: {
  type: String,
  required: true,
},
  motherName: {
  type: String,
  required: true,
},
  motherOccupation: {
  type: String,
  required: true,
},
  motherContactNo: {
  type: String,
  required: true,
},
});

//sub schema

const localGurdianSchema = new Schema<ILocalGuardian>({
  name: {
  type: String,
  required: true,
},
  occupation: {
  type: String,
  required: true,
},
  address: {
  type: String,
  required: true,
},
  contactNo: {
  type: String,
  required: true,
},
});

// Schema

const studentSchema = new Schema<IStudent>({
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
  presentAddress: {
  type: String,
  required: true,
},
  permanentAddress: {
  type: String,
  required: true,
},
  profileImg: {
  type: String,
  required: true,
},
  id: {
    type: String,
  },
  name: {
    type: studentNameSchema,
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
