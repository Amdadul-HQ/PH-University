import { model, Schema } from "mongoose";
import { IAcadaemicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<IAcadaemicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
},{
    timestamps:true
});

class AppError  extends Error{
  public statusCode :number;

  constructor(ststusCode:number,message:string,stack=''){
    super(message);
    this.statusCode = ststusCode;

    if (stack) {
      this.stack=stack
    }
    else{
      Error.captureStackTrace(this,this.constructor)
    }
  }
}


academicDepartmentSchema.pre('save',async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name:this.name,
    });

    if(isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND,"This Department is already exist!!")
    }
    next()
})


academicDepartmentSchema.pre('findOneAndUpdate',async function (next) {
   const id  =  this.getQuery();
console.log(id);
   const isDepartmentExist = await AcademicDepartment.findOne(id);
   console.log(isDepartmentExist);
   if(!isDepartmentExist){
       throw new AppError(404,"This Department does not exist!")
    }
    next()
})




export const AcademicDepartment = model<IAcadaemicDepartment>('AcademicDepartment',academicDepartmentSchema);
