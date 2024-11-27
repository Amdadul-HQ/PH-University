import { Schema, model } from 'mongoose';
import { IGuardian, ILocalGuardian, IStudent, IStudentName } from './student.interface';


// sub sechema

const studentNameSchema = new Schema<IStudentName>({
  firstName: {
    type: String,
    required: [true, 'Student First Name Is Required'],
    maxlength: [10, 'Student First Name Can Not More Than 10 Characters'],
  },
  middleName: {
    type: String,
    maxlength: [10, 'Student Middle Name Can Not More Than 10 Characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Student Last Name Is Required'],
    maxlength: [10, 'Student Last Name Can Not More Than 10 Characters'],
  },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is Required'],
    maxlength: [20, 'Father Name Not more than 20 characters'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is Required'],
    maxlength: [11, 'Father Contact Number Can not more then 11 Number'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
    maxlength: [20, 'Mother Name Not more than 20 characters'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is Required'],
    maxlength: [11, 'Mother Contact Number Can not more then 11 Number'],
  },
});

//sub schema

const localGurdianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Gurdian Name Is Required'],
    maxlength: [20, 'Local Name Not more than 20 characters'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guridan Occupation Is Required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guridan Address Is Rquired'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guridan Number Is Reqired'],
    maxlength: [11, 'Local Contact Number Can not more then 11 Number'],
  },
});

// Schema

const studentSchema = new Schema<IStudent>({
  dateOfBirth: {
    type: String,
    required: [true, 'Student Date of Birth Is Required'],
  },
  email: {
    type: String,
    required: [true, 'Student Email Is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Student Contact Number Is Required'],
    maxlength: [11, 'Student Contact Number Can not more then 11 Number'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Number Is Required'],
    maxlength: [11, 'Emergency Contact Number Can not more then 11 Number'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address Must be Needed'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address Is Required'],
  },
  profileImg: {
    type: String,
  },
  id: {
    type: String,
  },
  name: {
    type: studentNameSchema,
    required: [true, 'Student Name Must be Inputed'],
  },
  localGurdian: {
    type: localGurdianSchema,
    required: [true, 'Local Guridan Information need to be Inputed'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian Information need to be Inputed'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} This Gender Does not Exist',
    },
    required: [true, 'Gender Need To Be Inputed'],
  },
  bloogGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-'],
      message: '{VALUE} This is no valid blood group',
    },
    required: [true, 'Blood Group Needed'],
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// Mdel
export const Student = model<IStudent>('Student', studentSchema);
