import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import config from "../../app/config";
import bcrypt from 'bcrypt';
import { UserStatus } from "./user.constant";

const userSchema = new Schema<IUser,IUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      maxlength: [20, 'Password can not be more than 20'],
      select:0
    },
    passwordChangeAt:{
      type:Date,
      
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
      select:0
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre save middleware/hook : will work on create()

userSchema.pre('save',async function(next){
  
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
// hasing password

user.password = await bcrypt.hash(
  user.password,
  Number(config.bycrypt_salt_rounds),
);
 next()
});

// post save middleware/hook

userSchema.post('save',function(doc,next){
  
  doc.password =''

  next()
});


userSchema.statics.isUserExistsByCustomId= async function (id:string) {
  return await User.findOne({id}).select('+password')
}


userSchema.statics.isPasswordMatched = async function (plainTextPassword,hashedPassword) {
 return await bcrypt.compare(plainTextPassword,hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangeTimeStamp,
  jwtIssuedTimeStamp
) {
  const passwordChangedTime = new Date(passwordChangeTimeStamp).getTime()/1000;

  return passwordChangedTime > jwtIssuedTimeStamp;
};


export const User = model<IUser,IUserModel>('User',userSchema)