import { model, Schema } from "mongoose";
import { FacultyModel, IFaculty, IUserName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";

const userNameSchema = new Schema<IUserName>({
    firstName:{
        type:String,
        required:[true,'First Name is Required'],
        trim:true,
        maxlength:[20,'Name can not be more than 20 characters']
    },
    middleName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true,
        required:[true,'Last Name is Required'],
        maxlength:[20,'Name can not be more than 20 characters'],
    }
});

const facultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is Required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is Required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Parmanent Address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department id is required'],
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// filter out deleted documents
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});


facultySchema.virtual('fullName').get(function(){
    return(
        `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
    )
})


facultySchema.statics.isUserExists = async function (id:string) {
    const existingUser = await Faculty.findOne({id});
    return existingUser;
    
};


export const Faculty = model<IFaculty,FacultyModel>('Faculty',facultySchema)