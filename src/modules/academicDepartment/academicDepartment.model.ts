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

export const AcademicDepartment = model<IAcadaemicDepartment>('AcademicDepartment',academicDepartmentSchema);
