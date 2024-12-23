import { Types } from 'mongoose';

export interface IAcadaemicDepartment {
  name: string;
  academicFaculty: Types.ObjectId;
}
