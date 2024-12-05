import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../app/config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      maxlength: [20, 'Password can not be more than 20'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
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
})


export const User = model<IUser>('user',userSchema)