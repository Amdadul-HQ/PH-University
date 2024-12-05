import { model, Schema } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySechema = new Schema<IAcademicFaculty>({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
});

export const AcademicFaculty = model<IAcademicFaculty>('AcademicFaculty',academicFacultySechema);
