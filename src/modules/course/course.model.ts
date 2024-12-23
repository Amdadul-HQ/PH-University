import { model, Schema } from 'mongoose';
import {
  ICourse,
  ICourseFaculty,
  IPreRequisiteCourses,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<IPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: [true, 'Course Title is Required'],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourse: [preRequisiteCourseSchema],
});

courseSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

courseSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Course = model<ICourse>('Course', courseSchema);

const courseFacultySchema = new Schema<ICourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course Title is Required'],
    unique: true,
    ref: 'Course',
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<ICourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
