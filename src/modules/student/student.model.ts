import { Schema, model } from 'mongoose';
import { IGuardian, ILocalGuardian, IStudent, IStudentName } from './student.interface';


// sub sechema

const studentNameSchema = new Schema<IStudentName>(
{
  firstName: {
  type: String,
  required: [true,'Student First Name Is Required'],
},
  middleName: {
  type: String,
},
  lastName: {
  type: String,
  required: [true,'Student Last Name Is Required'],
},
})

const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is Required'],
  },
});

//sub schema

const localGurdianSchema = new Schema<ILocalGuardian>({
  name: {
  type: String,
  required: [true,'Local Gurdian Name Is Required'],
},
  occupation: {
  type: String,
  required: [true,'Local Guridan Occupation Is Required'],
},
  address: {
  type: String,
  required: [true,'Local Guridan Address Is Rquired'],
},
  contactNo: {
  type: String,
  required: [true,'Local Guridan Number Is Reqired'],
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
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Number Is Required'],
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
      message:'{VALUE} This Gender Does not Exist'
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
