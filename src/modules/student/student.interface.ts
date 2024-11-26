export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface IStudentName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface ILocalGuardian {
  name: string;
  occupation: string;
  address: string;
  contactNo: string;
}
export interface IStudent {
  id: string;
  name: IStudentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B-' | 'B+' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGurdian: ILocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
}
