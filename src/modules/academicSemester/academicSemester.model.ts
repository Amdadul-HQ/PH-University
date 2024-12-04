import { model, Schema } from 'mongoose';
import { IAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from './academicSemester.interface';


const months : TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const academicSemesterName :TAcademicSemesterName[] = ["Autumn","Summer","Fall"]

const academicSemesterCode :TAcademicSemesterCode[] = ["01","02","03"]

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum:academicSemesterName,
      required: true,
    },
    year:{
        type:Date,
        required:true
    },
    code:{
        type:String,
        enum:academicSemesterCode,
        required:true
    },
    startMonth:{
        type:String,
        enum:months,
    },
    endMonth:{
        type:String,
        enum:months,
    }
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<IAcademicSemester>('AcademicSemester',academicSemesterSchema)
