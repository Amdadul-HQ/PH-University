import {
  IAcademicSemesterMapper,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';

export const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterNameCodeMapper: IAcademicSemesterMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemesterSearchableFields = [
  'name',
];

export const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];
