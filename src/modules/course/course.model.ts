import { model, Schema } from "mongoose";
import { ICourse, IPreRequisiteCourses } from "./course.interface";


const preRequisiteCourseSchema = new Schema<IPreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const courseSchema = new Schema<ICourse>({
    title:{
        type:String,
        required:[true,'Course Title is Required'],
        unique:true,
        trim:true
    },
    prefix:{
        type:String,
        trim:true,
        required:true
    },
    code:{
        type:Number,
        trim:true,
        required:true
    },
    preRequisiteCourse:[preRequisiteCourseSchema],
});

export const Course = model<ICourse>('Course',courseSchema);