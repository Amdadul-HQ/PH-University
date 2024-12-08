import { Schema, model } from 'mongoose';
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IStudentModel,
  IStudentName,
} from './student.interface';
// import bcrypt from 'bcrypt';
// import config from '../../app/config';


// sub sechema

const studentValidationSchema = new Schema<IStudentName>({
  firstName: {
    type: String,
    required: [true, 'Student First Name Is Required'],
    maxlength: [10, 'Student First Name Can Not More Than 10 Characters'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize',
    },
  },
  middleName: {
    type: String,
    maxlength: [10, 'Student Middle Name Can Not More Than 10 Characters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Student Last Name Is Required'],
    maxlength: [10, 'Student Last Name Can Not More Than 10 Characters'],
    trim: true,
  },
});

const guardianValidationSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is Required'],
    maxlength: [20, 'Father Name Not more than 20 characters'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is Required'],
    maxlength: [11, 'Father Contact Number Can not more then 11 Number'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
    maxlength: [20, 'Mother Name Not more than 20 characters'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is Required'],
    maxlength: [11, 'Mother Contact Number Can not more then 11 Number'],
    trim: true,
  },
});

//sub schema

const localGurdianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Gurdian Name Is Required'],
    maxlength: [20, 'Local Name Not more than 20 characters'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local Guridan Occupation Is Required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local Guridan Address Is Rquired'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guridan Number Is Reqired'],
    maxlength: [11, 'Local Contact Number Can not more then 11 Number'],
    trim: true,
  },
});

// Schema

const createStudentValidationSchema = new Schema<IStudent, IStudentModel>(
  {
    dateOfBirth: {
      type: String,
      required: [true, 'Student Date of Birth Is Required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Student Email Is Required'],
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Student Contact Number Is Required'],
      maxlength: [11, 'Student Contact Number Can not more then 11 Number'],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Number Is Required'],
      maxlength: [11, 'Emergency Contact Number Can not more then 11 Number'],
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address Must be Needed'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address Is Required'],
      trim: true,
    },
    profileImg: {
      type: String,
    },
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: studentValidationSchema,
      required: [true, 'Student Name Must be Inputed'],
    },
    localGurdian: {
      type: localGurdianSchema,
      required: [true, 'Local Guridan Information need to be Inputed'],
    },
    guardian: {
      type: guardianValidationSchema,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual

createStudentValidationSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save middleware/hook : will work on create()

// createStudentValidationSchema.pre('save',async function(next){

//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const student = this
// // hasing password

// student.password = await bcrypt.hash(
//   student.password,
//   Number(config.bycrypt_salt_rounds),
// );
//  next()
// });

// // post save middleware/hook

// createStudentValidationSchema.post('save',function(doc,next){

//   doc.password =''

//   next()
// })

// Find Middle ware
createStudentValidationSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// findOne Middle ware
createStudentValidationSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// Static method
createStudentValidationSchema.statics.isStudentExists = async function (
  id: string,
) {
  const existStudent = await Student.findOne({ id,isDeleted:false });
  return existStudent;
};

// instance method
// createStudentValidationSchema.methods.isStudentExists = async function (id:string) {
//   const existStudent = await Student.findOne({id});
//   return existStudent;
// }

export const Student = model<IStudent, IStudentModel>(
  'student',
  createStudentValidationSchema,
);



