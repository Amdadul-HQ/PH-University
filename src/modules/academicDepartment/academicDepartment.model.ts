import { model, Schema } from "mongoose";
import { IAcadaemicDepartment } from "./academicDepartment.interface";

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


academicDepartmentSchema.pre('save',async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name:this.name,
    });

    if(isDepartmentExist){
        throw new Error("This Department is already exist!!")
    }
    next()
})




export const AcademicDepartment = model<IAcadaemicDepartment>('AcademicDepartment',academicDepartmentSchema);
