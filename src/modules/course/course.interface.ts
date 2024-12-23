import { Types } from 'mongoose';

export interface IPreRequisiteCourses {
  course: Types.ObjectId;
  isDeleted: boolean;
}

export interface ICourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourse: [IPreRequisiteCourses];
}

export interface ICourseFaculty {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
}
